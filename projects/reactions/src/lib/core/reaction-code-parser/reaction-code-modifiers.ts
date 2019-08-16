import {ReactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from '../reaction-types';

/**
 * Creates the part of an event matcher that matches on keyboard keys for ctrl, alt and meta.
 */
export function reactionCodeModifiers(tokens: ReactionCodeToken[]): ReactionCodeModifiers {
    return tokens
        .filter(token => token.type === ReactionCodeTypeEnum.MODIFIER)
        .reduce((acc: ReactionCodeModifiers, token: ReactionCodeToken) => {
            if (token.value === 'ctrl') {
                return {...acc, ctrlKey: true};
            } else if (token.value === 'alt') {
                return {...acc, altKey: true};
            } else if (token.value === 'meta') {
                return {...acc, metaKey: true};
            }
            throw new Error('Unsupported modifier');
        }, REACTION_CODE_MODIFIERS);
}
