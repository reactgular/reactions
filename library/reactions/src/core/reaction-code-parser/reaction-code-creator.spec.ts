import {reactionCodeCreator} from './reaction-code-creator';
import {TOKEN_CTRL, TOKEN_DOCUMENT} from '../../../tests/reaction-code-token.helper';
import {ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from '../reaction-types';

const m: ReactionCodeModifiers = REACTION_CODE_MODIFIERS;
const l = (value) => ({type: ReactionCodeTypeEnum.LITERAL, value});

describe(reactionCodeCreator.name, () => {

    it('should set the source to document and key', () => {
        expect(reactionCodeCreator([TOKEN_DOCUMENT, l('Escape')])).toEqual({
            source: 'document',
            event: {...m, type: 'keyup', key: 'Escape'}
        })
    });

    it('should set the source to element', () => {
        expect(reactionCodeCreator([l('click')])).toEqual({
            source: 'element',
            event: {...m, type: 'click'}
        })
    });

    it('should set the modifiers', () => {
        expect(reactionCodeCreator([TOKEN_DOCUMENT, TOKEN_CTRL, l('Escape')])).toEqual({
            source: 'document',
            event: {...m, type: 'keyup', key: 'Escape', ctrlKey: true}
        })
    });
});
