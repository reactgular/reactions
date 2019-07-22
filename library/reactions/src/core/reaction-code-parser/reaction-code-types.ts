/**
 * Defines the type event that triggers the reaction.
 *
 * @deprecated use ReactionEvent instead
 */
import {ReactionEventMatcher, ReactionSourceType} from '../reaction/reaction-types';

export interface ReactionCode {
    /**
     * The source for events.
     */
    source: ReactionSourceType;

    /**
     * The matching rule for events.
     */
    event: ReactionEventMatcher;
}

/**
 * Compiled shortcut code.
 */
export interface ReactionCodeModifiers {
    /**
     * Command key required
     */
    metaKey: boolean;

    /**
     * Alt key required
     */
    altKey: boolean;

    /**
     * Ctrl key required
     */
    ctrlKey: boolean;
}

/**
 * Default with all keys disabled.
 */
export const REACTION_CODE_MODIFIERS = Object.freeze<ReactionCodeModifiers>({
    metaKey: false,
    altKey: false,
    ctrlKey: false
});
