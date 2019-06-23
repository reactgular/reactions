import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionBase} from '../reaction-base/reaction-base';
import {ReactionModel} from '../reaction-model/reaction-model';
import {ReactionInstance} from '../reaction-hook/reaction-hook';

export interface ReactionCore {
    /**
     * All of the reaction events.
     */
    events$: Observable<ReactionEvent>;

    /**
     * Publishes events from the model for the reaction.
     */
    publish(model: ReactionModel, reaction: ReactionInstance, destroyed$: Observable<void>);

    /**
     * Bootstraps a reaction when it's being created.
     */
    bootstrap(reaction: ReactionBase);
}
