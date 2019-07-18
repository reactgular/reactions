/**
 * Defines the type event that triggers the reaction.
 */
export interface ReactionCode {
    /**
     * The key code or UI event.
     */
    type: string;

    /**
     * Modifiers for the event.
     */
    modifiers: ReactionCodeModifiers;
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
