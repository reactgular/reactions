import {ReactionCode, ReactionSourceType} from '../reaction-types';
import {ReactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {reactionCodeModifiers} from './reaction-code-modifiers';

/**
 * Converts a collection of tokens into a parsed reaction code.
 */
export function reactionCodeCreator(tokens: ReactionCodeToken[]): ReactionCode {
    const key = reactionKey(tokens);
    return {
        source: reactionCodeSource(tokens),
        event: {
            type: reactionCodeEventType(tokens),
            ...(key && {key}),
            ...reactionCodeModifiers(tokens)
        }
    }
}

export function reactionKey(tokens: ReactionCodeToken[]): string {
    return null;
}

/**
 * Converts a single reaction code string to a token.
 *
 * @deprecated I'm not sure this is used anymore
 */
export const reactionCodeToken = (value: string): ReactionCodeToken =>
    ({type: isCodeModifier(value) ? ReactionCodeTypeEnum.MODIFIER : ReactionCodeTypeEnum.LITERAL, value});

/**
 * True if the string is a keyboard modifier.
 */
export const isCodeModifier = (value: string): boolean => Boolean(value.match(/^(ctrl|alt|meta)$/i));

/**
 * Returns the source element that will emit events.
 */
export function reactionCodeSource(tokens: ReactionCodeToken[]): ReactionSourceType {
    const KEYBOARD_CODES = ['Escape', 'Enter', 'Delete', 'Backspace'];
    return tokens
        .reduce((acc: string, next) => {
            if (next.type === ReactionCodeTypeEnum.SOURCE) {
                acc = next.value;
            } else if (next.type === ReactionCodeTypeEnum.LITERAL
                && next.value.length === 1) {
                // single character literals are assumed to be keyboard codes
                acc = 'document'
            } else if (next.type === ReactionCodeTypeEnum.LITERAL
                && KEYBOARD_CODES.indexOf(next.value) !== -1) {
                acc = 'document'
            }
            return acc;
        }, 'element') as ReactionSourceType;
}

/**
 * Checks if source token is set to the value.
 */
function isFirstType(tokens: ReactionCodeToken[], type: ReactionCodeTypeEnum, value: string) {
    const s = tokens.find(token => token.type === type);
    return s ? s.value === value : false
}

/**
 * Returns the type code with modifiers removed.
 */
export function reactionCodeEventType(tokens: ReactionCodeToken[]): string {
    return isFirstType(tokens, ReactionCodeTypeEnum.SOURCE, 'document')
        ? 'keyup'
        : tokens
            .filter(token => token.type === ReactionCodeTypeEnum.LITERAL)
            .map(token => token.value)
            .join(' ');
}
