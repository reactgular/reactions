import {ElementRef, Injectable} from '@angular/core';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {defaultIfEmpty, first, map, scan, switchMap, takeUntil} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionSelector} from '../reaction-selectors/reaction-selector';
import {Reaction} from '../reaction/reaction';
import {ReactionSelectMouse} from '../reaction-selectors/reaction-select-mouse';
import {ReactionSelectFocus} from '../reaction-selectors/reaction-select-focus';

/**
 * Reactions trigger UI events via this service, and then they can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 *
 * Consumers filter events to select which ones they want to react to.
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

    public from(reaction: Reaction, target: ElementRef<HTMLElement>, data$: Observable<any>, destroy$: Observable<void>) {
        const eventNames = [
            ...ReactionSelectMouse.EVENTS,
            ...ReactionSelectFocus.EVENTS
        ];

        const events$ = eventNames.map(eventName => fromEvent(target.nativeElement, eventName));
        const type = 'uiEvent', id = 0, data = null;

        merge(...events$).pipe(
            map((event: FocusEvent) => ({id, type, data, event, reaction})),
            switchMap(event => data$.pipe(
                defaultIfEmpty(undefined),
                first(),
                map(data => ({...event, data}))
            )),
            takeUntil(destroy$)
        ).subscribe(event => this._events$.next(event));
    }
}
