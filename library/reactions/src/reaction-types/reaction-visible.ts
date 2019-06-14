import {Observable} from 'rxjs';
import {Reaction} from '../reaction/reaction';

/**
 * Adds support for showing/hiding a reaction.
 */
export interface ReactionVisible {
    /**
     * Emits if the tool should be shown.
     */
    visible(): Observable<boolean> | boolean;
}

/**
 * State object for ReactionVisible
 */
export interface ReactionVisibleState {
    /**
     * Visible state
     */
    visible$: Observable<boolean>;
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
 * Checks if a reaction supports visibility.
 */
export function isReactionVisible(value: any): value is ReactionVisible {
    return typeof (<ReactionVisible>value).visible === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionVisibleReducer(acc: any, next: Reaction): ReactionVisibleState {
    const visible$ = isReactionVisible(next) ? next.visible() : true;
    return {...acc, ...{visible$}};
}
