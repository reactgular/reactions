import {REACTION_CODE_MODIFIERS, ReactionCode, ReactionCodeModifiers, ReactionCodeToken} from './reaction-code-types';

/**
 * Expects a one or mode code strings like "click, ctrl+n"
 */
export const reactionCodeParser = (codes: string): ReactionCode[] =>
    codes.split(',').map(reactionCodeTokens).map(reactionCode);

/**
 * Converts a collection of tokens into a parsed reaction code.
 */
export const reactionCode = (tokens: ReactionCodeToken[]): ReactionCode =>
    ({type: reactionRemoveModifiers(tokens), modifiers: reactionKeyModifiers(tokens)});

/**
 * Converts a string of reaction codes into a collection of code tokens. A reaction code looks like "ctrl+m" and you can
 * define multiple codes using a "," separator.
 */
export const reactionCodeTokens = (str: string): ReactionCodeToken[] =>
    str.trim().toUpperCase().replace(/\s/g, '').split('+').map(rewriteValue).map(reactionCodeToken);

/**
 * Converts a single reaction code string to a token.
 */
export const reactionCodeToken = (value: string): ReactionCodeToken =>
    ({type: isCodeModifier(value) ? 'modifier' : 'type', value});

/**
 * True if the string is a keyboard modifier.
 */
export const isCodeModifier = (value: string): boolean => Boolean(value.search(/ctrl|shift|alt|meta/i));

/**
 * Rewrites reaction code values.
 */
export function rewriteValue(value: string): string {
    const map = {
        DELETE: 'DEL',
        ESCAPE: 'ESC',
        BACK: 'BACKSPACE',
        CONTROL: 'CTRL',
        CMD: 'META',
        COMMAND: 'META',
        DOUBLECLICK: 'DBLCLICK'
    };
    return map[value] ? map[value] : value;
}

/**
 * Returns the type code with modifiers removed.
 *
 * @todo This should rewrite DEL (delete), ESC (escape), BACKSPACE (back)
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
            if (token.value === 'CTRL') {
                return {...acc, ctrlKey: true};
            } else if (token.value === 'ALT') {
                return {...acc, altKey: true};
            } else if (token.value === 'SHIFT') {
                return {...acc, shiftKey: true};
            } else if (token.value === 'META') {
                return {...acc, metaKey: true};
            }
            return acc;
        }, REACTION_CODE_MODIFIERS);
}
