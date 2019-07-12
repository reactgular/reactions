import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {combineLatest, Observable, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, shareReplay, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ReactionCoreService} from '../../reaction-services/reaction-core/reaction-core.service';
import {ReactionSnapshot, toReactionSnapshot} from '../../reaction-engine/reaction-snapshots/reaction-snapshot';
import {ReactionState, toReactionState} from '../../reaction-engine/reaction-state/reaction-state';
import {withMergeMap, withSwitchMap} from '../../reaction-utils/observables';
import {combineEvents} from '../../reaction-utils/combine-events';
import {hydrateReaction} from '../../reaction-utils/hydrate-reaction';
import {ReactionObject} from '../../reaction-engine/reaction/reaction-types';

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    selector: '[rgReaction]',
    exportAs: 'rgReaction'
})
export class ReactionModelDirective implements OnInit, OnDestroy {
    /**
     * Destructor event
     */
    public readonly destroyed$: Subject<void> = new Subject();

    /**
     * Emits changes to the reaction object.
     */
    public reaction$: Observable<ReactionObject>;

    /**
     * Emits snapshots of the reaction.
     */
    public snapshot$: Observable<ReactionSnapshot>;

    /**
     * Emits the reaction as a state object.
     */
    public state$: Observable<ReactionState>;

    /**
     * Emits the reaction object.
     */
    private readonly _reaction$: ReplaySubject<ReactionObject> = new ReplaySubject(1);

    /**
     * Constructor
     */
    public constructor(private readonly _reactionCore: ReactionCoreService,
                       private readonly _el: ElementRef<HTMLElement>,
                       private readonly _view: ViewContainerRef,
                       private readonly _renderer: Renderer2) {
    }

    /**
     * Sets the reaction object. We use unknown to reduce warnings in templates.
     */
    @Input('rgReaction')
    public set reaction(reaction: unknown) {
        this._reaction$.next(hydrateReaction(reaction as ReactionObject));
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        this.reaction$ = this._reaction$.pipe(
            distinctUntilChanged(),
            shareReplay(1)
        );

        this.state$ = this.reaction$.pipe(
            map(reaction => toReactionState(reaction)),
            shareReplay(1)
        );

        this.snapshot$ = this.reaction$.pipe(
            switchMap(reaction => toReactionSnapshot(reaction)),
            shareReplay(1)
        );

        this._renderer.addClass(this._el.nativeElement, 'rg-reaction');

        const toArray = (cond: any, value: string): string[] => cond ? [value] : [];
        const snapshot$ = this.snapshot$;
        const styles$ = [
            snapshot$.pipe(map(s => s.css)),
            snapshot$.pipe(map(s => toArray(s.icon, 'rg-reaction-icon'))),
            snapshot$.pipe(map(s => toArray(s.secondary, 'rg-reaction-secondary'))),
            snapshot$.pipe(map(s => toArray(s.title, 'rg-reaction-title'))),
            snapshot$.pipe(map(s => toArray(s.tooltip, 'rg-reaction-tooltip'))),
            snapshot$.pipe(map(s => toArray(s.animate, 'rg-reaction-animate'))),
            snapshot$.pipe(map(s => toArray(s.disabled, 'rg-reaction-disabled')))
        ];

        combineLatest(styles$).pipe(
            // merge all the CSS arrays into a single array
            map((values) => values.reduce((acc, next) => ([...acc, ...next]), [])),
            startWith([]),
            pairwise(),
            map(([prev, next]: [string[], string[]]) => {
                return {
                    add: next.filter(x => !prev.includes(x)),
                    remove: prev.filter(x => !next.includes(x))
                };
            }),
            takeUntil(this.destroyed$)
        ).subscribe((change: { add: string[], remove: string[] }) => {
            change.add.forEach(css => this._renderer.addClass(this._el.nativeElement, css));
            change.remove.forEach(css => this._renderer.removeClass(this._el.nativeElement, css));
        });

        this.reaction$.pipe(
            withSwitchMap(reaction => combineEvents(this._el, hydrateReaction(reaction).__REACTION__)),
            withMergeMap(([reaction, event]) => toReactionState(reaction).disabled),
            filter(([value, disabled]) => !disabled),
            map(([value, disabled]) => value),
            takeUntil(this.destroyed$)
        ).subscribe(([reaction, event]) => this._reactionCore.broadcast(reaction, event.type, event, this._el, this._view));
    }
}
