import {Observable} from 'rxjs';
import {ReactionObject, ReactionProperty} from '../reaction-types';
import {toReactionValue} from '../../utils/reaction-value';

export type ReactionSortable = string | number;

/**
 * Defines the order of this reaction in a sorted list.
 */
export interface ReactionOrder {
    /**
     * A sort value to order reactions by groups.
     */
    order: ReactionProperty<ReactionSortable>;

    /**
     * Group sorted reactions together by this value.
     */
    group?: ReactionProperty<ReactionSortable>;
}

/**
 * State object for ReactionOrder
 */
export interface ReactionOrderState {
    order: Observable<ReactionSortable>;

    group: Observable<ReactionSortable>
}

/**
 * Snapshot of icon state
 */
export interface ReactionOrderSnapshot {
    order: ReactionSortable;

    group: ReactionSortable;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionOrderReducer(acc: ReactionObject, next: ReactionObject | ReactionOrder): ReactionObject {
    const order = toReactionValue(next.order, 0);
    const group = toReactionValue(next.group, 0);
    return {...acc, order, group};
}
