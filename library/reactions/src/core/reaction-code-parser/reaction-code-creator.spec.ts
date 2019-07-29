import {isCodeModifier, reactionCodeToken} from './reaction-code-creator';
import {ReactionCodeTypeEnum} from './reaction-code-tokenizer';

describe(reactionCodeToken.name, () => {
    it('should be a modifier', () => {
        expect(reactionCodeToken('ctrl')).toEqual({type: ReactionCodeTypeEnum.MODIFIER, value: 'ctrl'});
        expect(reactionCodeToken('alt')).toEqual({type: ReactionCodeTypeEnum.MODIFIER, value: 'alt'});
        expect(reactionCodeToken('meta')).toEqual({type: ReactionCodeTypeEnum.MODIFIER, value: 'meta'});
    });

    it('should not be a modifier', () => {
        expect(reactionCodeToken('m')).toEqual({type: ReactionCodeTypeEnum.LITERAL, value: 'm'});
        expect(reactionCodeToken('esc')).toEqual({type: ReactionCodeTypeEnum.LITERAL, value: 'esc'});
        expect(reactionCodeToken('backspace')).toEqual({type: ReactionCodeTypeEnum.LITERAL, value: 'backspace'});
    });
});

describe(isCodeModifier.name, () => {
    it('should be true', () => {
        expect(isCodeModifier('CTRL')).toBe(true, 'ctrl');
        expect(isCodeModifier('ALT')).toBe(true, 'alt');
        expect(isCodeModifier('META')).toBe(true, 'meta');
    });

    it('should be false', () => {
        expect(isCodeModifier('ESC')).toBe(false, 'ESC');
        expect(isCodeModifier('CLICK')).toBe(false, 'CLICK');
        expect(isCodeModifier('BECTRL')).toBe(false, 'BECTRL');
        expect(isCodeModifier('SHIFTING')).toBe(false, 'SHIFTING');
        expect(isCodeModifier('MALT')).toBe(false, 'MALT');
        expect(isCodeModifier('METAS')).toBe(false, 'METAS');
    });
});
