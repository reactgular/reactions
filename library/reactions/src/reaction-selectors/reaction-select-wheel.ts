import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionTouchEvent, ReactionTouchEvent} from '../reaction-events/reaction-touch-event';

/**
 * A selector for touch events.
 */
export class ReactionSelectTouch {
    /**
     * Emits only touch events.
     */
    public readonly events$: Observable<ReactionTouchEvent>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionTouchEvent>(event => isReactionTouchEvent(event))
        );
    }
}
