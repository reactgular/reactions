import {Observable} from 'rxjs';
import {ReactionConfig} from '../reaction-config/reaction-config';

/**
 *
 */
export interface ReactionTitle {
    /**
     * Configuration options for the tool.
     */
    readonly config?: Partial<ReactionConfig>;

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
export function isReaction(value: any): value is ReactionTitle {
    return typeof (<ReactionTitle>value).title === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionTitleReducer(acc: any, next: ReactionTitle): ReactionTitleState {
    const title$ = next.title();
    return {...acc, ...{title$}};
}
