import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';

export interface ReactionCode {
    /**
     * All of the reaction events.
     */
    events$: Observable<ReactionEvent>;
}
