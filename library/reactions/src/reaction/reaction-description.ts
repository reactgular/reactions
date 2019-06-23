import {Observable} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {ReactionObject, toReactionValue} from './reaction';

/**
 * Description of the reaction.
 */
export interface ReactionDescription {
    /**
     * A description of this reaction used in the shortcut dialog.
     */
    description: ReactionProperty<string>;
}

/**
 * State object for ReactionDescription
 */
export interface ReactionDescriptionState {
    /**
     * A description of this reaction used in the shortcut dialog.
     */
    description: Observable<string>;
}

/**
 * Snapshot object for ReactionDescription
 */
export interface ReactionDescriptionSnapshot {
    /**
     * A description of this reaction used in the shortcut dialog.
     */
    description: string;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionDescriptionReducer(acc: ReactionObject, next: ReactionObject | ReactionDescription): ReactionObject {
    const description = toReactionValue(next.description);
    return {...acc, description};
}
