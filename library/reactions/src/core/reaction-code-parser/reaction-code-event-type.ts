import {ReactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';

/**
 * Returns the type code with modifiers removed.
 */
export function reactionCodeEventType(tokens: ReactionCodeToken[]): string {
    const isKeyup = tokens.some(token => token.type === ReactionCodeTypeEnum.SOURCE && token.value === 'document');
    if (isKeyup) {
        return 'keyup';
    }
    return tokens
        .filter(token => token.type === ReactionCodeTypeEnum.LITERAL)
        .map(token => token.value)
        .join(' ');
}
