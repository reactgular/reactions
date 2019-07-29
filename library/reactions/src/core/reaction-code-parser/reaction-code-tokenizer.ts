import {reactionCodeRewrite} from './reaction-code-rewrite';
import {reactionCodeToken} from './reaction-code-creator';

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
 * Parsers a code string into a collection code tokens.
 *
 * @todo This should more accurately set the source token. Right now it's just a default.
 */
export const reactionCodeTokenizer = (code: string): ReactionCodeToken[] => ([reactionSourceToken(code), ...reactionCodeToTokens(code)]);

/**
 * The source defines where events will be emitted from. All keyboard shortcuts are
 * emitted by the document. A developer will often not set a source prefix, and
 * the default is set to element. The final source selected depends on what other
 * tokens exist in the code expression.
 */
export const reactionSourceToken = (str: string): ReactionCodeToken =>
    ({type: ReactionCodeTypeEnum.SOURCE, value: str.startsWith('key:') ? 'document' : 'element'});

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
