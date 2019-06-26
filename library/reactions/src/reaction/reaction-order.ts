import {Observable} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {ReactionObject} from './reaction';
import {toReactionValue} from '../reaction-utils/reaction-value';

/**
 * Defines the order of this reaction in a sorted list.
 */
export interface ReactionOrder {
    /**
     * A sort value usually in the format "XXXX:0000" where the ":" is used to separate reactions into
     * groups.
     */
    order: ReactionProperty<string>;
}

/**
 * State object for ReactionOrder
 */
export interface ReactionOrderState {
    order: Observable<string>;
}

/**
 * Snapshot of icon state
 */
export interface ReactionOrderSnapshot {
    order: string;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionOrderReducer(acc: ReactionObject, next: ReactionObject | ReactionOrder): ReactionObject {
    const order = toReactionValue(next.order, '0');
    return {...acc, order};
}
