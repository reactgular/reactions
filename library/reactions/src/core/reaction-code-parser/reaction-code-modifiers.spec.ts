import {reactionCodeModifiers} from './reaction-code-modifiers';
import {ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from '../reaction-types';

const m: ReactionCodeModifiers = REACTION_CODE_MODIFIERS;

describe(reactionCodeModifiers.name, () => {
    const ctrl = {type: ReactionCodeTypeEnum.MODIFIER, value: 'ctrl'};
    const alt = {type: ReactionCodeTypeEnum.MODIFIER, value: 'alt'};
    const meta = {type: ReactionCodeTypeEnum.MODIFIER, value: 'meta'};

    it('should return modifiers', () => {
        expect(reactionCodeModifiers([ctrl])).toEqual({...m, ctrlKey: true});
        expect(reactionCodeModifiers([alt])).toEqual({...m, altKey: true});
        expect(reactionCodeModifiers([meta])).toEqual({...m, metaKey: true});
        expect(reactionCodeModifiers([ctrl, alt, meta])).toEqual({ctrlKey: true, altKey: true, metaKey: true});
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
