import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionMouseEvent, ReactionMouseEvent} from '../reaction-events/reaction-mouse-event';

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
    public readonly events$: Observable<ReactionMouseEvent>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionMouseEvent>(event => isReactionMouseEvent(event))
        );
    }
}
