import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionInstance} from '../reaction-hook/reaction-hook';
import {ReactionModel} from '../reaction-model/reaction-model';
import {ReactionObject} from '../reaction/reaction';

/**
 * @deprecated This was added to resolve a circular with ReactionBase, but remove this when you remove ReactionBase
 */
export interface ReactionCore {
    /**
     * All of the reaction events.
     */
    events$: Observable<ReactionEvent>;

    /**
     * Bootstraps a reaction when it's being created.
     */
    bootstrap(reaction: ReactionObject);

    /**
     * Publishes events from the model for the reaction.
     */
    publish(model: ReactionModel, reaction: ReactionInstance, destroyed$: Observable<void>);
}
