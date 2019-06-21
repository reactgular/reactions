import {Observable} from 'rxjs';
import {ReactionBase} from '../reaction-base/reaction-base';

/**
 * Adds support for disabling a reaction.
 */
export interface ReactionDisabled {
    /**
     * Emits the disabled state of a tool.
     */
    disabled(): Observable<boolean> | boolean;
}

/**
 * State object for ReactionDisabled
 */
export interface ReactionDisabledState {
    /**
     * Disabled state
     */
    disabled$: Observable<boolean>;
}

/**
 * Snapshot of disabled
 */
export interface ReactionDisabledSnapshot {
    /**
     * Disabled state
     */
    disabled: boolean;
}

/**
 * Checks if a reaction supports being disabled.
 */
export function isReactionDisabled(value: any): value is ReactionDisabled {
    return typeof (<ReactionDisabled>value).disabled === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionDisabledReducer(acc: any, next: ReactionBase): ReactionDisabledState {
    const disabled$ = isReactionDisabled(next) ? next.disabled() : false;
    return {...acc, ...{disabled$}};
}
