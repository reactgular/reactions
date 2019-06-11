import {ElementRef, Injectable} from '@angular/core';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {defaultIfEmpty, first, map, scan, switchMap, takeUntil} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionSelector} from '../reaction-selectors/reaction-selector';
import {ReactionMouseEvent} from '../reaction-events/reaction-mouse-event';
import {Reaction} from '../reaction/reaction';
import {ReactionSelectMouse} from '../reaction-selectors/reaction-select-mouse';
import {ReactionFocusEvent} from '../reaction-events/reaction-focus-event';
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
        const focus$ = this._focusEvents(reaction, target.nativeElement);
        const mouse$ = this._mouseEvents(reaction, target.nativeElement);

        const events$ = [focus$, mouse$];

        merge(...events$).pipe(
            switchMap(event => data$.pipe(
                defaultIfEmpty(undefined),
                first(),
                map(data => ({...event, data}))
            )),
            takeUntil(destroy$)
        ).subscribe(event => this._events$.next(event));
    }

    private _focusEvents(reaction: Reaction, target: HTMLElement): Observable<ReactionFocusEvent> {
        const events$ = ReactionSelectFocus.EVENTS.map(eventName => fromEvent(target, eventName));
        const type = 'focus', id = 0, data = null;
        return merge(...events$).pipe(
            map((event: FocusEvent) => ({id, type, data, event, reaction}))
        );
    }

    private _mouseEvents(reaction: Reaction, target: HTMLElement): Observable<ReactionMouseEvent> {
        const events$ = ReactionSelectMouse.EVENTS.map(eventName => fromEvent(target, eventName));
        const type = 'mouse', id = 0, data = null;
        return merge(...events$).pipe(
            map((event: MouseEvent) => ({id, type, data, event, reaction}))
        );
    }
}
