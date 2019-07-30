import {ReactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {ReactionSourceType} from '../reaction-types';

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
