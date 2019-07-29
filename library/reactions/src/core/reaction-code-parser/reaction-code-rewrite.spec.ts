import {reactionCodeRewrite} from './reaction-code-rewrite';

describe(reactionCodeRewrite.name, () => {
    it('should rewrite values', () => {
        expect(reactionCodeRewrite('delete')).toBe('del');
        expect(reactionCodeRewrite('escape')).toBe('esc');
        expect(reactionCodeRewrite('back')).toBe('backspace');
        expect(reactionCodeRewrite('cmd')).toBe('meta');
        expect(reactionCodeRewrite('command')).toBe('meta');
        expect(reactionCodeRewrite('doubleclick')).toBe('dblclick');
        expect(reactionCodeRewrite('control')).toBe('ctrl');
    });

    it('should not rewrite values', () => {
        expect(reactionCodeRewrite('del')).toBe('del');
        expect(reactionCodeRewrite('esc')).toBe('esc');
        expect(reactionCodeRewrite('backspace')).toBe('backspace');
        expect(reactionCodeRewrite('meta')).toBe('meta');
        expect(reactionCodeRewrite('dblclick')).toBe('dblclick');
    });
});
