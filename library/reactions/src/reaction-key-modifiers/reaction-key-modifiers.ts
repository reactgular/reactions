/**
 * Compiled shortcut code.
 */
export interface ReactionKeyModifiers {
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

    /**
     * Shift key required
     */
    shiftKey: boolean;
}

/**
 * Default with all keys disabled.
 */
export const REACTION_KEY_MODIFIERS = Object.freeze<ReactionKeyModifiers>({
    metaKey: false,
    altKey: false,
    ctrlKey: false,
    shiftKey: false
});

/**
 * Parses the key modifiers for a string. For example; CTRL+N
 */
export function reactionKeyModifiers(str: string): ReactionKeyModifiers {
    return str
        .trim()
        .toUpperCase()
        .replace(/\s/g, '')
        .split('+')
        .reduce((acc: ReactionKeyModifiers, next: string) => {
            if (next === 'CTRL') {
                return {...acc, ctrlKey: true};
            } else if (next === 'ALT') {
                return {...acc, altKey: true};
            } else if (next === 'SHIFT') {
                return {...acc, shiftKey: true};
            } else if (next === 'META') {
                return {...acc, metaKey: true};
            }
            return acc;
        }, REACTION_KEY_MODIFIERS);
}
