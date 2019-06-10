import {Observable} from 'rxjs';

/**
 * Adds support for showing/hiding a reaction.
 */
export interface ReactionVisible {
    /**
     * Emits if the tool should be shown.
     */
    visible(): Observable<boolean>;
}

/**
 * Checks if a reaction supports visibility.
 */
export function isReactionVisible(value: any): value is ReactionVisible {
    return typeof (<ReactionVisible>value).visible === 'function';
}
