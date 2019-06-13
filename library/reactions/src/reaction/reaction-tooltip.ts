import {Observable} from 'rxjs';
import {Reaction} from './reaction';

export interface ReactionTooltip {
    /**
     * The tooltip shown when mouse hovering.
     */
    tooltip(): Observable<string> | string;
}

/**
 * State object for ReactionTooltip
 */
export interface ReactionTooltipState {
    /**
     * Tooltip state
     */
    tooltip$: Observable<string>;
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
 * Checks if an object is a reaction
 */
export function isReactionTooltip(value: any): value is ReactionTooltip {
    return typeof (<ReactionTooltip>value).tooltip === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionTooltipReducer(acc: any, next: Reaction): ReactionTooltipState {
    const tooltip$ = isReactionTooltip(next) ? next.tooltip() : undefined;
    return {...acc, ...{tooltip$}};
}
