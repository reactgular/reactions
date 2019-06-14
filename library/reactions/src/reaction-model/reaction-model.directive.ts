import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, shareReplay, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {ReactionCoreService} from '../reaction-core/reaction-core.service';
import {ReactionSnapshots, toReactionSnapshots} from '../reaction-snapshots/reaction-snapshots';
import {ReactionStates, toReactionStates} from '../reaction-states/reaction-states';
import {isReaction} from '../reaction-types/reaction-title';
import {Reaction} from '../reaction/reaction';

/**
 * Asserts that the rgReaction directive is present.
 */
export function assertReactionModel(name: string, reactionModel?: ReactionModelDirective) {
    if (!reactionModel) {
        throw new Error(`${name} requires a DOM element to have [ngReaction] assigned with a reaction object.`);
    }
}

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    selector: '[rgReaction]'
})
export class ReactionModelDirective implements OnInit, OnDestroy {
    /**
     * Emits changes to the reaction object.
     */
    public reaction$: Observable<Reaction>;

    /**
     * Emits snapshots of the reaction.
     */
    public snapshot$: Observable<ReactionSnapshots>;

    /**
     * Emits the reaction as a state object.
     */
    public state$: Observable<ReactionStates>;

    /**
     * Data inputted by the DOM
     */
    private readonly _data$: BehaviorSubject<any> = new BehaviorSubject(undefined);

    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Emits the reaction object.
     */
    private readonly _reaction$: ReplaySubject<Reaction> = new ReplaySubject(1);

    /**
     * Constructor
     */
    public constructor(private _reactionCore: ReactionCoreService,
                       private _el: ElementRef<HTMLElement>,
                       private _view: ViewContainerRef,
                       private _renderer: Renderer2) {
    }

    /**
     * User defined data
     */
    @Input()
    public set data(value: any) {
        this._data$.next(value);
    }

    /**
     * Sets the reaction object.
     */
    @Input('rgReaction')
    public set reaction(reaction: Reaction) {
        this._reaction$.next(reaction);
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        this.reaction$ = this._reaction$.pipe(
            filter(value => isReaction(value)),
            distinctUntilChanged(),
            shareReplay(1)
        );

        this.state$ = this.reaction$.pipe(
            map(reaction => toReactionStates(reaction)),
            shareReplay(1)
        );

        this.snapshot$ = this.reaction$.pipe(
            switchMap(reaction => toReactionSnapshots(reaction)),
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
            takeUntil(this._destroyed$)
        ).subscribe((change: { add: string[], remove: string[] }) => {
            change.add.forEach(css => this._renderer.addClass(this._el.nativeElement, css));
            change.remove.forEach(css => this._renderer.removeClass(this._el.nativeElement, css));
        });

        const changed$: Subject<void> = new Subject();

        this.reaction$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(reaction => {
            changed$.next();
            this._reactionCore.fromUI(reaction, this._el, this._view, this._data$, merge(changed$, this._destroyed$));
        });
    }
}
