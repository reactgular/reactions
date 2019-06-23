import {Observable} from 'rxjs';
import {ReactionObject, ReactionProperty, toReactionValue} from './reaction';

/**
 * Adds support for disabling a reaction.
 */
export interface ReactionDisabled {
    /**
     * Emits the disabled state of a tool.
     */
    disabled: ReactionProperty<boolean>;
}

/**
 * State object for ReactionDisabled
 */
export interface ReactionDisabledState {
    /**
     * Disabled state
     */
    disabled: Observable<boolean>;
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
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionDisabledReducer(acc: any, [next, data]: [ReactionObject, any]): ReactionDisabledState {
    const disabled = toReactionValue(next['disabled'], data);
    return {...acc, disabled};
}
