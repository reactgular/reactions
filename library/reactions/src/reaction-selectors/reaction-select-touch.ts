import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionWheelEvent, ReactionWheelEvent} from '../reaction-events/reaction-wheel-event';

/**
 * A selector for wheel events.
 */
export class ReactionSelectWheel {
    /**
     * Emits only wheel events.
     */
    public readonly events$: Observable<ReactionWheelEvent>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionWheelEvent>(event => isReactionWheelEvent(event))
        );
    }
}
