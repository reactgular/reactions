import {Observable} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {toReactionValue} from '../../reaction-utils/reaction-value';
import {ReactionObject} from './reaction-types';

/**
 * A display title for a reaction. All reactions should have a title. If none is provided then "n/a" will be the default.
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
export function reactionTitleReducer(acc: ReactionObject, next: ReactionObject | ReactionTitle): ReactionObject {
    const title = toReactionValue(next.title, 'n/a');
    return {...acc, title};
}
