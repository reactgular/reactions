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
 * The source prefix is stripped and codes split on the plus character. Common
 * values are rewritten to match event values (example; escape => Escape), and
 * each string value is converted to a code token.
 */
export const reactionCodeTokenizer = (str: string): ReactionCodeToken[] => str
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
