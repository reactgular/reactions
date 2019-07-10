import {REACTION_CODE_MODIFIERS, ReactionCode, ReactionCodeModifiers} from './reaction-code-types';

/**
 * Reaction codes are parsed into tokens.
 */
interface ReactionCodeToken {
    /**
     * Type of token
     */
    type: 'modifier' | 'type';

    /**
     * Token value
     */
    value: string;
}

/**
 * Expects one or mode code strings like "click, ctrl+n"
 */
export const reactionCodeParser = (codes: string): ReactionCode[] =>
    codes.split(',').map(reactionCodeTokens).map(reactionCode);

/**
 * Converts a string of reaction codes into a collection of code tokens. A reaction code looks like "ctrl+m" and you can
 * define multiple codes using a "," separator.
 */
const reactionCodeTokens = (str: string): ReactionCodeToken[] =>
    str.trim().toLowerCase().replace(/\s/g, '').split('+').map(rewriteValue).map(reactionCodeToken);

/**
 * Converts a collection of tokens into a parsed reaction code.
 */
const reactionCode = (tokens: ReactionCodeToken[]): ReactionCode =>
    ({type: reactionRemoveModifiers(tokens), modifiers: reactionKeyModifiers(tokens)});

/**
 * Converts a single reaction code string to a token.
 */
export const reactionCodeToken = (value: string): ReactionCodeToken =>
    ({type: isCodeModifier(value) ? 'modifier' : 'type', value});

/**
 * True if the string is a keyboard modifier.
 */
export const isCodeModifier = (value: string): boolean => Boolean(value.match(/^(ctrl|shift|alt|meta)$/i));

/**
 * Rewrites reaction code values.
 */
export function rewriteValue(value: string): string {
    // a map would be faster, but won't show as untested in coverage report when a key is added.
    if (value === 'delete') {
        return 'del';
    } else if (value === 'escape') {
        return 'esc';
    } else if (value === 'back') {
        return 'backspace';
    } else if (value === 'cmd' || value === 'command') {
        return 'meta'
    } else if (value === 'doubleclick') {
        return 'dblclick';
    } else if (value === 'control') {
        return 'ctrl';
    }
    return value;
}

/**
 * Returns the type code with modifiers removed.
 */
export function reactionRemoveModifiers(tokens: ReactionCodeToken[]): string {
    return tokens
        .filter(token => token.type === 'type')
        .map(token => token.value)
        .join(' ');
}

/**
 * Parses the key modifiers for a string. For example; CTRL+N
 */
export function reactionKeyModifiers(tokens: ReactionCodeToken[]): ReactionCodeModifiers {
    return tokens
        .filter(token => token.type === 'modifier')
        .reduce((acc: ReactionCodeModifiers, token: ReactionCodeToken) => {
            if (token.value === 'ctrl') {
                return {...acc, ctrlKey: true};
            } else if (token.value === 'alt') {
                return {...acc, altKey: true};
            } else if (token.value === 'shift') {
                return {...acc, shiftKey: true};
            } else if (token.value === 'meta') {
                return {...acc, metaKey: true};
            }
            return acc;
        }, REACTION_CODE_MODIFIERS);
}
