import {Observable} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {ReactionObject} from './reaction';
import {toReactionValue} from '../reaction-utils/reaction-value';

/**
 * Tooltip settings for a reaction.
 */
export interface ReactionTooltip {
    /**
     * The tooltip shown when mouse hovering.
     */
    tooltip: ReactionProperty<string>;
}

/**
 * State object for ReactionTooltip
 */
export interface ReactionTooltipState {
    /**
     * Tooltip state
     */
    tooltip: Observable<string>;
}

/**
 * Snapshot of tooltip.
 */
export interface ReactionTooltipSnapshot {
    /**
     * Tooltip state
     */
    tooltip: string;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionTooltipReducer(acc: ReactionObject, next: ReactionObject | ReactionTooltip): ReactionObject {
    const tooltip = toReactionValue(next.tooltip);
    return {...acc, tooltip};
}
