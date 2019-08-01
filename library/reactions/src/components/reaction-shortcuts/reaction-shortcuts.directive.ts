import {Directive, OnDestroy, OnInit} from '@angular/core';

/**
 * Applies the keyboard bindings to the document so that reactions receive keyboard press events.
 */
@Directive({
    selector: '[rgReactionShortcuts]'
})
export class ReactionShortcutsDirective implements OnInit, OnDestroy {
    /**
     * Emits a collection of reactions that might have keyboard bindings.
     */
    // private readonly _reactions$: ReplaySubject<ReactionObject[]> = new ReplaySubject(1);

    /**
     * Destructor
     */
    // private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    // public constructor(@Inject(DOCUMENT) private _doc: Document,
    //                    private readonly _reactionCode: ReactionCoreService,
    //                    private readonly _el: ElementRef<HTMLElement>,
    //                    private readonly _view: ViewContainerRef) {
    //
    // }

    /**
     * Binds the attribute as the source for reactions.
     */
    // @Input('rgReactionShortcuts')
    // public set reactions(value: ReactionObject[]) {
    //     this._reactions$.next(value);
    // };

    /**
     * Destruction
     */
    public ngOnDestroy(): void {
        // this._reactions$.next([]);
        // this._destroyed$.next();
        // this._destroyed$.complete();
    }

    /**
     * Initialization
     */
    public ngOnInit(): void {
        // const subscribeDocumentEvents = (reaction: ReactionObject): Subscription => {
        //     return reactionEventObservable(
        //         this._doc,
        //         reaction.__REACTION__.filter(hook => hook.source === 'document')
        //     ).pipe(
        //         disabledWhen(toReactionState(reaction).disabled),
        //         takeUntil(this._destroyed$)
        //     ).subscribe(event => this._reactionCode.broadcast(reaction, event, this._el, this._view));
        // };
        //
        // const createSubscriptions = (reactions: ReactionObject[]): Subscription => {
        //     return reactions.reduce((sub, reaction) => (sub.add(subscribeDocumentEvents(reaction)), sub), new Subscription());
        // };
        //
        // const mapPreviousSubscription = ([previous, next]: [Subscription, Subscription]) => previous;
        //
        // this._reactions$.pipe(
        //     startWith([]),
        //     map(createSubscriptions),
        //     pairwise(),
        //     map(mapPreviousSubscription),
        //     takeUntil(this._destroyed$)
        // ).subscribe((previous: Subscription) => previous.unsubscribe());
    }
}
