import {Observable} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {ReactionObject} from './reaction';
import {toReactionValue} from '../reaction-utils/reaction-value';

/**
 * Adds support for showing/hiding a reaction.
 */
export interface ReactionVisible {
    /**
     * Emits if the tool should be shown.
     */
    visible: ReactionProperty<boolean>;
}

/**
 * State object for ReactionVisible
 */
export interface ReactionVisibleState {
    /**
     * Visible state
     */
    visible: Observable<boolean>;
}

/**
 * Snapshot of visible state
 */
export interface ReactionVisibleSnapshot {
    /**
     * Visible state
     */
    visible: boolean;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionVisibleReducer(acc: ReactionObject, next: ReactionObject | ReactionVisible): ReactionObject {
    const visible = toReactionValue(next.visible, true);
    return {...acc, visible};
}
