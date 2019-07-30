import {reactionCodeModifiers} from './reaction-code-modifiers';
import {ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from '../reaction-types';
import {TOKEN_ALT, TOKEN_CTRL, TOKEN_META} from '../../../tests/reaction-code-token.helper';

const m: ReactionCodeModifiers = REACTION_CODE_MODIFIERS;

describe(reactionCodeModifiers.name, () => {
    it('should return modifiers', () => {
        expect(reactionCodeModifiers([TOKEN_CTRL])).toEqual({...m, ctrlKey: true});
        expect(reactionCodeModifiers([TOKEN_ALT])).toEqual({...m, altKey: true});
        expect(reactionCodeModifiers([TOKEN_META])).toEqual({...m, metaKey: true});
        expect(reactionCodeModifiers([TOKEN_CTRL, TOKEN_META])).toEqual({...m, ctrlKey: true, metaKey: true});
        expect(reactionCodeModifiers([TOKEN_CTRL, TOKEN_ALT, TOKEN_META])).toEqual({ctrlKey: true, altKey: true, metaKey: true});
    });

    it('should throw for unknown modifiers', () => {
        expect(() => reactionCodeModifiers([
            {type: ReactionCodeTypeEnum.MODIFIER, value: 'unknown'}
        ])).toThrow(new Error('Unsupported modifier'))
    });

    it('should return default modifiers', () => {
        expect(reactionCodeModifiers([])).toEqual(m);
        expect(reactionCodeModifiers([{type: ReactionCodeTypeEnum.LITERAL, value: 'm'}])).toEqual(m);
    });
});
