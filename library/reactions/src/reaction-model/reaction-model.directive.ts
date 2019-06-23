import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, map, pairwise, shareReplay, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ReactionCoreService} from '../reaction-core/reaction-core.service';
import {ReactionSnapshots, toReactionSnapshots} from '../reaction-snapshots/reaction-snapshots';
import {ReactionState, toReactionState} from '../reaction-state/reaction-state';
import {ReactionObject} from '../reaction/reaction';
import {ReactionModel} from './reaction-model';

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    selector: '[rgReaction]',
    exportAs: 'rgReaction'
})
export class ReactionModelDirective implements OnInit, OnDestroy, ReactionModel {
    /**
     * Data inputted by the DOM
     */
    public readonly data$: BehaviorSubject<any> = new BehaviorSubject(undefined);

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
    public snapshot$: Observable<ReactionSnapshots>;

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
    public constructor(private _reactionCore: ReactionCoreService,
                       public readonly el: ElementRef<HTMLElement>,
                       public readonly view: ViewContainerRef,
                       private _renderer: Renderer2) {
    }

    /**
     * User defined data
     */
    @Input()
    public set data(value: any) {
        this.data$.next(value);
    }

    /**
     * Sets the reaction object.
     */
    @Input('rgReaction')
    public set reaction(reaction: ReactionObject) {
        console.log('rgReaction setter', reaction);
        this._reaction$.next(reaction);
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
            tap(val => console.log('reaction$', val)),
            distinctUntilChanged(),
            shareReplay(1)
        );

        this.state$ = this.reaction$.pipe(
            map(reaction => toReactionState(reaction)),
            shareReplay(1)
        );

        this.snapshot$ = this.reaction$.pipe(
            switchMap(reaction => toReactionSnapshots(reaction)),
            shareReplay(1)
        );

        this._renderer.addClass(this.el.nativeElement, 'rg-reaction');

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
            change.add.forEach(css => this._renderer.addClass(this.el.nativeElement, css));
            change.remove.forEach(css => this._renderer.removeClass(this.el.nativeElement, css));
        });

        const changed$: Subject<void> = new Subject();

        this.reaction$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(reaction => {
            changed$.next();
            // @todo this doesn't have to use "this" could create an object and keep things private and move destroy back
            this._reactionCore.publish(this, reaction, merge(changed$, this.destroyed$));
        });
    }
}
