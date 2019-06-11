import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for drag events.
 */
export class ReactionSelectDrag {
    /**
     * Emits only drag events.
     */
    public readonly events$: Observable<ReactionUIEvent<DragEvent>>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionUIEvent<DragEvent>>(event => isReactionUIEvent(event) && event.event instanceof DragEvent)
        );
    }
}
