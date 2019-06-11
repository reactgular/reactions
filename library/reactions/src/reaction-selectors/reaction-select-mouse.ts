import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for mouse events.
 */
export class ReactionSelectMouse {
    /**
     * List of event types.
     */
    public static readonly EVENTS = [
        'auxclick',
        'click',
        'contextmenu',
        'dblclick',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mouseover',
        'mouseout',
        'mouseup',
        'wheel'
    ];

    /**
     * Emits only mouse events.
     */
    public readonly events$: Observable<ReactionUIEvent<MouseEvent>>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionUIEvent<MouseEvent>>(event => isReactionUIEvent(event) && event.event instanceof MouseEvent)
        );
    }

    /**
     * Selects only auxclick events.
     */
    public auxclick(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('auxclick');
    }

    /**
     * Selects only click events.
     */
    public click(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('click');
    }

    /**
     * Selects only contextmenu events.
     */
    public contextmenu(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('contextmenu');
    }

    /**
     * Selects only dblclick events.
     */
    public dblclick(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('dblclick');
    }

    /**
     * Selects only mousedown events.
     */
    public mousedown(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mousedown');
    }

    /**
     * Selects only mouseenter events.
     */
    public mouseenter(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseenter');
    }

    /**
     * Selects only mouseleave events.
     */
    public mouseleave(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseleave');
    }

    /**
     * Selects only mouseout events.
     */
    public mouseout(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseout');
    }

    /**
     * Selects only mouseover events.
     */
    public mouseover(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseover');
    }

    /**
     * Selects only mouseup events.
     */
    public mouseup(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseup');
    }

    /**
     * Selects only wheel events.
     */
    public wheel(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('wheel');
    }

    /**
     * Filters events by the given type.
     */
    private _filter(type: string): Observable<ReactionUIEvent<MouseEvent>> {
        return this.events$.pipe(filter(event => event.event.type === type));
    }
}
