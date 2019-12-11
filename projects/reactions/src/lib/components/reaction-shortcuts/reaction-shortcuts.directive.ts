import {DOCUMENT} from '@angular/common';
import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Destroyable} from '@reactgular/destroyable';
import {disabledWhen} from '@reactgular/observables';
import {ReplaySubject, Subscription} from 'rxjs';
import {filter, map, pairwise, startWith, takeUntil} from 'rxjs/operators';
import {reactionEventMatcher} from '../../core/reaction-event/reaction-event-matcher';
import {reactionEventObservable} from '../../core/reaction-event/reaction-event-observable';
import {toReactionState} from '../../core/reaction-state/reaction-state';
import {ReactionObject} from '../../core/reaction-types';
import {ReactionCoreService} from '../../services/reaction-core/reaction-core.service';

/**
 * Applies the keyboard bindings to the document so that reactions receive keyboard press events.
 */
@Directive({
    selector: '[rgReactionShortcuts]'
})
export class ReactionShortcutsDirective extends Destroyable implements OnInit, OnDestroy {
    /**
     * Emits a collection of reactions that might have keyboard bindings.
     */
    private readonly _reactions$: ReplaySubject<unknown[]> = new ReplaySubject(1);

    /**
     * Constructor
     */
    public constructor(@Inject(DOCUMENT) private _doc: any,
                       private readonly _reactionCode: ReactionCoreService,
                       private readonly _el: ElementRef<HTMLElement>,
                       private readonly _view: ViewContainerRef) {
        super();
    }

    /**
     * Binds the attribute as the source for reactions.
     */
    @Input('rgReactionShortcuts')
    public set reactions(value: unknown[]) {
        this._reactions$.next(value);
    };

    /**
     * Destruction
     */
    public ngOnDestroy(): void {
        this._reactions$.next([]);
        super.ngOnDestroy();
    }

    /**
     * Initialization
     */
    public ngOnInit(): void {
        const subscribeDocumentEvents = (reaction: ReactionObject): Subscription => {
            return reactionEventObservable(
                this._doc,
                reaction.__REACTION__.filter(hook => hook.source === 'document')
            ).pipe(
                filter(event => reaction.__REACTION__.some(hook => reactionEventMatcher(event, hook.event))),
                disabledWhen(toReactionState(reaction).disabled),
                takeUntil(this._destroyed$)
            ).subscribe(event => this._reactionCode.broadcast(reaction, event, 'document', this._el, this._view));
        };

        const createSubscriptions = (reactions: ReactionObject[]): Subscription => {
            return reactions.reduce((sub, reaction) => (sub.add(subscribeDocumentEvents(reaction)), sub), new Subscription());
        };

        const mapPreviousSubscription = ([previous, next]: [Subscription, Subscription]) => previous;

        this._reactions$.pipe(
            startWith([]),
            map(createSubscriptions),
            pairwise(),
            map(mapPreviousSubscription),
            takeUntil(this._destroyed$)
        ).subscribe((previous: Subscription) => previous.unsubscribe());
    }
}
