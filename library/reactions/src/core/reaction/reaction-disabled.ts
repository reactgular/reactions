import {Observable} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {toReactionValue} from '../../utils/reaction-value';
import {ReactionObject} from './reaction-types';

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
export function reactionDisabledReducer(acc: ReactionObject, next: ReactionObject | ReactionDisabled): ReactionObject {
    const disabled = toReactionValue(next.disabled, false);
    return {...acc, disabled};
}
