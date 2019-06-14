import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {Reaction} from '../reaction/reaction';
import {ReactionModel} from '../reaction-model/reaction-model';

export interface ReactionCore {
    /**
     * All of the reaction events.
     */
    events$: Observable<ReactionEvent>;

    /**
     * Publishes events from the model for the reaction.
     */
    publish(model: ReactionModel, reaction: Reaction, destroyed$: Observable<void>);

    /**
     * Bootstraps a reaction when it's being created.
     */
    bootstrap(reaction: Reaction);
}
