import {ElementRef, Injectable} from '@angular/core';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {defaultIfEmpty, first, map, scan, switchMap, takeUntil} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionSelectDrag} from '../reaction-selectors/reaction-select-drag';
import {ReactionSelectFocus} from '../reaction-selectors/reaction-select-focus';
import {ReactionSelectMouse} from '../reaction-selectors/reaction-select-mouse';
import {ReactionSelectTouch} from '../reaction-selectors/reaction-select-touch';
import {ReactionSelector} from '../reaction-selectors/reaction-selector';
import {Reaction} from '../reaction/reaction';

/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 */
@Injectable({providedIn: 'root'})
export class ReactionCoreService extends ReactionSelector {
    /**
     * Emitter of the events.
     */
    private readonly _events$: Subject<ReactionEvent>;

    /**
     * Constructor
     */
    public constructor() {
        const events$ = new Subject<ReactionEvent>();
        const eventsWithId$ = events$.pipe(scan((acc, next) => ({...next, id: acc.id + 1}), {id: 0} as ReactionEvent));

        super(eventsWithId$);

        this._events$ = events$;
    }

    /**
     * Subscribes to multiple UI events on the target, and broadcasts events for the reaction.
     */
    public from(reaction: Reaction, target: ElementRef<HTMLElement>, data$: Observable<any>, destroy$: Observable<void>) {
        const eventNames = [
            ...ReactionSelectDrag.EVENTS,
            ...ReactionSelectFocus.EVENTS,
            ...ReactionSelectMouse.EVENTS,
            ...ReactionSelectTouch.EVENTS
        ];

        const events$ = eventNames.map(eventName => fromEvent(target.nativeElement, eventName));
        const type = 'uiEvent', id = 0, data = null;

        merge(...events$).pipe(
            map(event => ({id, type, data, event, reaction})),
            switchMap(event => data$.pipe(
                defaultIfEmpty(undefined),
                first(),
                map(data => ({...event, data}))
            )),
            takeUntil(destroy$)
        ).subscribe(event => this._events$.next(event));
    }
}
