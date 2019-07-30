import {ReactionCode} from '../reaction-types';
import {ReactionCodeToken} from './reaction-code-tokenizer';
import {reactionCodeModifiers} from './reaction-code-modifiers';
import {reactionCodeSource} from './reaction-code-source';
import {reactionCodeKey} from './reaction-code-key';
import {reactionCodeEventType} from './reaction-code-event-type';

/**
 * Converts a collection of tokens into a parsed reaction code.
 */
export function reactionCodeCreator(tokens: ReactionCodeToken[]): ReactionCode {
    const key = reactionCodeKey(tokens);
    return {
        source: reactionCodeSource(tokens),
        event: {
            type: reactionCodeEventType(tokens),
            ...(key && {key}),
            ...reactionCodeModifiers(tokens)
        }
    }
}

