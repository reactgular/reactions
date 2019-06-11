import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {isReactionDragEvent, ReactionDragEvent} from '../reaction-events/reaction-drag-event';
import {ReactionEvent} from '../reaction-events/reaction-event';

/**
 * A selector for drag events.
 */
export class ReactionSelectDrag {
    /**
     * Emits only drag events.
     */
    public readonly events$: Observable<ReactionDragEvent>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionDragEvent>(event => isReactionDragEvent(event))
        );
    }
}
