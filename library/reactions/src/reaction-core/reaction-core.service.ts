import {ElementRef, Injectable, ViewContainerRef} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {defaultIfEmpty, first, map, scan, switchMap, takeUntil} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionCode} from './reaction-code';
import {Reaction} from '../reaction/reaction';

/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 */
@Injectable({providedIn: 'root'})
export class ReactionCoreService implements ReactionCode {
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
     */
    public fromUI(reaction: Reaction,
                  el: ElementRef<HTMLElement>,
                  view: ViewContainerRef,
                  data$: Observable<any>,
                  destroy$: Observable<void>) {
        const type = 'uiEvent', id = 0, data = null;

        // @todo this should use hooks instead.
        // const events$ = reaction.config.events.map(eventName => fromEvent(el.nativeElement, eventName));
        const events$ = [];
        merge(...events$).pipe(
            map<any, ReactionEvent>(payload => ({id, type, data, el, view, payload, reaction})),
            switchMap(event => data$.pipe(
                defaultIfEmpty(undefined),
                first(),
                map(data => ({...event, data}))
            )),
            takeUntil(destroy$)
        ).subscribe(event => this._events$.next(event));
    }
}
