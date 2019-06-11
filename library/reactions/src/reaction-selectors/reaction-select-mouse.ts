import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionMouseEvent, ReactionMouseEvent} from '../reaction-events/reaction-mouse-event';

/**
 * A selector for mouse events.
 */
export class ReactionSelectMouse {
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
