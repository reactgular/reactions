import {ElementRef, Injectable, ViewContainerRef} from '@angular/core';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {defaultIfEmpty, first, map, scan, switchMap, takeUntil, throttleTime} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionCore} from './reaction-core';
import {Reaction} from '../reaction/reaction';
import {ReactionModel} from '../reaction-model/reaction-model';

/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 */
@Injectable({providedIn: 'root'})
export class ReactionCoreService implements ReactionCore {
    /**
     * All of the reaction events.
     */
    public readonly events$: Observable<ReactionEvent>;

    /**
     * Emitter of the events.
     */
    private readonly _events$: Subject<ReactionEvent>;

    /**
     * Constructor
     */
    public constructor() {
        this._events$ = new Subject<ReactionEvent>();
        this.events$ = this._events$.pipe(scan((acc, next) => ({...next, id: acc.id + 1}), {id: 0} as ReactionEvent));
    }

    /**
     * Subscribes to multiple UI events on the target and broadcasts events for the reaction.
     *
     * @deprecated
     */
    public fromUI(reaction: Reaction,
                  el: ElementRef<HTMLElement>,
                  view: ViewContainerRef,
                  data$: Observable<any>,
                  destroy$: Observable<void>) {
        throw new Error('not implemented');
    }

    /**
     * Bootstraps a reaction when it's being created.
     */
    public bootstrap(reaction: Reaction) {
    }

    /**
     * Publishes events from the model for the reaction.
     */
    public publish({el, view, data$}: ReactionModel, reaction: Reaction, destroyed$: Observable<void>) {
        const type = 'uiEvent', id = 0, data = null;

        const events$ = reaction.hocks.map(hook => {
            let event$ = fromEvent(el.nativeElement, hook.eventType);
            return hook.debounce
                ? event$.pipe(throttleTime(hook.debounce))
                : event$;
        });

        merge(...events$).pipe(
            map<any, ReactionEvent>(payload => ({id, type, data, el, view, payload, reaction})),
            switchMap(event => data$.pipe(
                defaultIfEmpty(undefined),
                first(),
                map(data => ({...event, data}))
            )),
            takeUntil(destroyed$)
        ).subscribe(event => {
            (<UIEvent>event.payload).preventDefault();
            this._events$.next(event);
        });
    }

}
