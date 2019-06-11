import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for wheel events.
 */
export class ReactionSelectWheel {
    /**
     * Emits only wheel events.
     */
    public readonly events$: Observable<ReactionUIEvent<WheelEvent>>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionUIEvent<WheelEvent>>(event => isReactionUIEvent(event) && event.event instanceof WheelEvent)
        );
    }
}
