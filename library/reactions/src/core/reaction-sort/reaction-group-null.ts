import {ReactionSortable} from '../reaction/reaction-order';
import {ReactionObject} from '../reaction-types';

/**
 * Contains the group a reaction belongs to and the reaction object.
 */
export interface ReactionGroupNull {
    group: ReactionSortable;

    reaction: ReactionObject;
}

interface ReactionGroupNullState {
    reactions: Array<ReactionObject | null>;

    groupSize: number;

    minGroupSize: number;
}

function reactionGroupNullReducer(
    state: ReactionGroupNullState,
    item: ReactionGroupNull,
    indx: number,
    source: ReactionGroupNull[]
): ReactionGroupNullState {
    state.reactions.push(item.reaction);
    state.groupSize++;
    const hasNext = indx < source.length - 1;
    const next = hasNext && source[indx + 1];
    if (
        hasNext
        && item.group !== (next && next.group)
        && state.groupSize >= state.minGroupSize
    ) {
        state.reactions.push(null);
        state.groupSize = 0;
    }
    return state;
}

/**
 * Given an ordered array of reaction objects returns an array where null separates different groups.
 */
export const reactionGroupNull = (items: ReactionGroupNull[], minGroupSize: number = 0)
    : Array<ReactionObject | null> => {
    return minGroupSize === 0
        ? items.map(({reaction}) => reaction)
        : items.reduce<ReactionGroupNullState>(reactionGroupNullReducer, {reactions: [], groupSize: 0, minGroupSize}).reactions;
};
