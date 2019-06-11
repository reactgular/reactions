import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for mouse events.
 */
export class ReactionSelectMouse {
    public static readonly EVENTS = [
        'auxclick',
        'click',
        'contextmenu',
        'dblclick',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
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
}
