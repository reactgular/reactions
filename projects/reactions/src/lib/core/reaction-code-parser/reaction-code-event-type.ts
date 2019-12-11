import {ReactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';

/**
 * Returns the type code with modifiers removed.
 */
export function reactionCodeEventType(tokens: ReactionCodeToken[]): string {
    const literals = tokens.filter(token => token.type === ReactionCodeTypeEnum.LITERAL)
        .map(token => token.value)
        .join(' ');

    const isSourceDocument = tokens.some(token => token.type === ReactionCodeTypeEnum.SOURCE && token.value === 'document');
    const isSingleLetter = literals.length === 1;
    const isTitleCaseWord = literals.match(/^[A-Z].+$/);
    if (isSourceDocument || isSingleLetter || isTitleCaseWord) {
        return 'keyup';
    }

    const type = tokens
        .filter(token => token.type === ReactionCodeTypeEnum.LITERAL)
        .map(token => token.value)
        .join(' ').trim();

    if (!type) {
        throw new Error('Reaction code can not parse event type value.');
    }

    return type;
}
