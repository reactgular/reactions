import {isCodeModifier, reactionCodeToken, ReactionCodeTypeEnum} from './reaction-code-tokenizer';
import {TOKEN_ALT, TOKEN_CTRL, TOKEN_META} from '../../../tests/reaction-code-token.helper';

describe(reactionCodeToken.name, () => {
    it('should be a modifier', () => {
        expect(reactionCodeToken('ctrl')).toEqual(TOKEN_CTRL);
        expect(reactionCodeToken('alt')).toEqual(TOKEN_ALT);
        expect(reactionCodeToken('meta')).toEqual(TOKEN_META);
    });

    it('should not be a modifier', () => {
        expect(reactionCodeToken('m')).toEqual({type: ReactionCodeTypeEnum.LITERAL, value: 'm'});
        expect(reactionCodeToken('esc')).toEqual({type: ReactionCodeTypeEnum.LITERAL, value: 'esc'});
        expect(reactionCodeToken('backspace')).toEqual({type: ReactionCodeTypeEnum.LITERAL, value: 'backspace'});
    });
});

describe(isCodeModifier.name, () => {
    it('should be true', () => {
        expect(isCodeModifier('ctrl')).toBe(true, 'ctrl');
        expect(isCodeModifier('alt')).toBe(true, 'alt');
        expect(isCodeModifier('meta')).toBe(true, 'meta');
    });

    it('should be false', () => {
        expect(isCodeModifier('ESC')).toBe(false, 'ESC');
        expect(isCodeModifier('CLICK')).toBe(false, 'CLICK');
        expect(isCodeModifier('BECTRL')).toBe(false, 'BECTRL');
        expect(isCodeModifier('SHIFTING')).toBe(false, 'SHIFTING');
        expect(isCodeModifier('MALT')).toBe(false, 'MALT');
        expect(isCodeModifier('METAS')).toBe(false, 'METAS');
    });

    it('should be case sensitive', () => {
        expect(isCodeModifier('CTRL')).toBe(false, 'CTRL');
        expect(isCodeModifier('ALT')).toBe(false, 'ALT');
        expect(isCodeModifier('META')).toBe(false, 'META');
    });
});
