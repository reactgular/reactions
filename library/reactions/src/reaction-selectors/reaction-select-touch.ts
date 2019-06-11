import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for touch events.
 */
export class ReactionSelectTouch {
    /**
     * List of event types.
     */
    public static readonly EVENTS = [
        'touchcancel',
        'touchend',
        'touchmove',
        'touchstart'
    ];


    /**
     * Emits only touch events.
     */
    public readonly events$: Observable<ReactionUIEvent<TouchEvent>>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionUIEvent<TouchEvent>>(event => isReactionUIEvent(event) && event.event instanceof TouchEvent)
        );
    }

    /**
     * Selects only touchcancel events.
     */
    public touchcancel(): Observable<ReactionUIEvent<TouchEvent>> {
        return this._filter('touchcancel');
    }

    /**
     * Selects only touchend events.
     */
    public touchend(): Observable<ReactionUIEvent<TouchEvent>> {
        return this._filter('touchend');
    }

    /**
     * Selects only touchmove events.
     */
    public touchmove(): Observable<ReactionUIEvent<TouchEvent>> {
        return this._filter('touchmove');
    }

    /**
     * Selects only touchstart events.
     */
    public touchstart(): Observable<ReactionUIEvent<TouchEvent>> {
        return this._filter('touchstart');
    }

    /**
     * Filters events by the given type.
     */
    private _filter(type: string): Observable<ReactionUIEvent<TouchEvent>> {
        return this.events$.pipe(filter(event => event.event.type === type));
    }
}