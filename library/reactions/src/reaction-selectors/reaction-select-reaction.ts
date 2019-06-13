import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {isReactionEvent, ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionTitle} from '../reaction-types/reaction-title';
import {ReactionSelector} from './reaction-selector';

/**
 * Helper to select events by reaction instance.
 */
export class ReactionSelectReaction extends ReactionSelector {
    /**
     * Constructor
     */
    public constructor(events$: Observable<ReactionEvent>,
                       public readonly reaction: ReactionTitle) {
        super(events$.pipe(filter(event => isReactionEvent(reaction, event))));
    }
}
