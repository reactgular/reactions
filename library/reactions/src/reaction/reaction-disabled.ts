import {Observable} from 'rxjs';

/**
 * Adds support for disabling a reaction.
 */
export interface ReactionDisabled {
    /**
     * Emits the disabled state of a tool.
     */
    disabled(): Observable<boolean>;
}

/**
 * Checks if a reaction supports being disabled.
 */
export function isReactionDisabled(value: any): value is ReactionDisabled {
    return typeof (<ReactionDisabled>value).disabled === 'function';
}
