import {Observable} from 'rxjs';

/**
 *
 */
export interface ReactionTitle {
    /**
     * The title shown in the body of a button or menu item.
     */
    title(): Observable<string> | string;
}

/**
 * State object for Reaction
 */
export interface ReactionTitleState {
    /**
     * Title state
     */
    title$: Observable<string>;
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
 * Checks if an object is a reaction
 */
export function isReactionTitle(value: any): value is ReactionTitle {
    return typeof (<ReactionTitle>value).title === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionTitleReducer(acc: any, next: unknown): ReactionTitleState {
    const title$ = isReactionTitle(next) ? next.title() : undefined;
    return {...acc, ...{title$}};
}
