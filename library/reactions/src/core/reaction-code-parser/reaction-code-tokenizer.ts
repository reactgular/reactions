import {reactionCodeRewrite} from './reaction-code-rewrite';

export enum ReactionCodeTypeEnum {
    /**
     * Keyboard modifiers like "ctrl"
     */
    MODIFIER,
    /**
     * Can be an event type or event property. Such as "click" or "Escape"
     */
    LITERAL,
    /**
     * Source for the event.
     */
    SOURCE
}

/**
 * Reaction codes are parsed into tokens.
 */
export interface ReactionCodeToken {
    /**
     * The type of token value.
     */
    type: ReactionCodeTypeEnum;

    /**
     * Token value
     */
    value: string;
}

/**
 * Parses a code string into a collection code tokens.
 */
export const reactionCodeTokenizer = (code: string): ReactionCodeToken[] => {
    const source = reactionSourceToken(code);
    const tokens = reactionCodeToTokens(code);
    return source ? [source, ...tokens] : tokens;
};

/**
 * The source defines where events will be emitted from. All keyboard shortcuts are
 * emitted by the document. A developer will often not set a source prefix, and
 * the default is set to element. The final source selected depends on what other
 * tokens exist in the code expression.
 */
export const reactionSourceToken = (str: string): ReactionCodeToken | void => {
    if (str.startsWith('key:')) {
        return {type: ReactionCodeTypeEnum.SOURCE, value: 'document'};
    } else if (str.startsWith('el:')) {
        return {type: ReactionCodeTypeEnum.SOURCE, value: 'element'};
    }
};

/**
 * The source prefix is stripped and codes split on the plus character. Common
 * values are rewritten to match event values (example; escape => Escape), and
 * each string value is converted to a code token.
 */
export const reactionCodeToTokens = (str: string): ReactionCodeToken[] => str
    .replace(/^([^:]+:)?/, '')
    .split('+')
    .map(reactionCodeRewrite)
    .map(reactionCodeToken);

/**
 * Converts a single reaction code string to a token.
 */
export const reactionCodeToken = (value: string): ReactionCodeToken =>
    ({type: isCodeModifier(value) ? ReactionCodeTypeEnum.MODIFIER : ReactionCodeTypeEnum.LITERAL, value});

/**
 * True if the string is a keyboard modifier.
 */
export const isCodeModifier = (value: string): boolean => value === 'ctrl' || value === 'alt' || value === 'meta';
