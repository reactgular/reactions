import {Observable} from 'rxjs';
import {ReactionObject, ReactionProperty, toReactionValue} from './reaction';

/**
 * A display title for a reaction.
 */
export interface ReactionTitle {
    /**
     * The title shown in the body of a button or menu item.
     */
    title: ReactionProperty<string>;
}

/**
 * State object for Reaction
 */
export interface ReactionTitleState {
    /**
     * Title state
     */
    title: Observable<string>;
}

/**
 * Snapshot of reaction.
 */
export interface ReactionTitleSnapshot {
    /**
     * Title state
     */
    title: string;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionTitleReducer(acc: ReactionObject, next: ReactionObject): ReactionObject {
    const title = toReactionValue(next['title']);
    return {...acc, ...title};
}
