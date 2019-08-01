import {ReactionSortable} from '../reaction/reaction-order';
import {ReactionObject} from '../reaction-types';

/**
 * Contains the sortable properties of a reaction taken from a snapshot.
 */
export interface ReactionSortCompare {
    order: ReactionSortable;

    group: ReactionSortable;

    reaction: ReactionObject;
}

/**
 * Compare function for two reaction objects.
 */
export function reactionSortCompare(a: ReactionSortCompare, b: ReactionSortCompare): number {
    return a.group == b.group
        ? ((a.order < b.order) ? -1 : (a.order > b.order) ? 1 : 0)
        : ((a.group < b.group) ? -1 : 1);
}
