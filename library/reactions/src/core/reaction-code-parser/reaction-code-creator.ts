import {ReactionCode} from '../reaction-types';
import {ReactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {reactionCodeModifiers} from './reaction-code-modifiers';
import {reactionCodeEventType} from './reaction-code-event-type';

/**
 * Converts a collection of tokens into a parsed reaction code.
 */
export function reactionCodeCreator(tokens: ReactionCodeToken[]): ReactionCode {
    const type = reactionCodeEventType(tokens);
    const source = type === 'keyup' ? 'document' : 'element';
    const key = type === 'keyup' && tokens.filter(t => t.type === ReactionCodeTypeEnum.LITERAL).map(t => t.value).join(' ');
    return {
        source,
        event: {
            type,
            ...(key && {key}),
            ...reactionCodeModifiers(tokens)
        }
    }
}

