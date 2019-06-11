import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for touch events.
 */
export class ReactionSelectTouch {
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
}
