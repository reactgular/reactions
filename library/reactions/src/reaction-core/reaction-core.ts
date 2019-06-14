import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';

export interface ReactionCore {
    /**
     * All of the reaction events.
     */
    events$: Observable<ReactionEvent>;
}
