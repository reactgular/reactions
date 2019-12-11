import {ReactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';

/**
 * Validates that the collection of tokens contains enough information to generate a valid code. Otherwise it
 * throws an error message.
 */
export function reactionCodeValidator(tokens: ReactionCodeToken[]): ReactionCodeToken[] {
    const hasLiteral = tokens.some(token => token.type === ReactionCodeTypeEnum.LITERAL);
    if (tokens.length === 0) {
        throw new Error('Reaction code is empty.');
    } else if (!hasLiteral) {
        throw new Error('Invalid reaction code');
    }
    return tokens;
}
