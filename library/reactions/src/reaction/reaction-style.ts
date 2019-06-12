import {Observable} from 'rxjs';

/**
 * Adds support for applying CSS styles to a reaction.
 */
export interface ReactionStyle {
    /**
     * Emits CSS styles for the reaction component.
     */
    css(): Observable<string | string[] | void>;
}

/**
 * Checks if the reaction supports styles.
 */
export function isReactionStyle(value: any): value is ReactionStyle {
    return typeof (<ReactionStyle>value).css === 'function';
}
