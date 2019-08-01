import {ReactionCode} from '../reaction-types';
import {reactionCodeTokenizer} from './reaction-code-tokenizer';
import {reactionCodeCreator} from './reaction-code-creator';
import {reactionCodeValidator} from './reaction-code-validator';

/**
 * Expects one or mode code strings like "click, ctrl+n, key:Escape"
 */
export const reactionCodeParser = (codes: string): ReactionCode[] =>
    codes
        .replace(/\s/g, '')
        .split(',')
        .map(reactionCodeTokenizer)
        .map(reactionCodeValidator)
        .map(reactionCodeCreator);

