import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from './reaction-code-types';
import {
    isCodeModifier,
    reactionCodeParser,
    reactionCodeToken,
    reactionKeyModifiers,
    reactionRemoveModifiers,
    rewriteValue
} from './reaction-code-parser';

const m: ReactionCodeModifiers = REACTION_CODE_MODIFIERS;

describe(reactionCodeParser.name, () => {
    it('should work with ctrl key', () => {
        expect(reactionCodeParser('ctrl+m')).toEqual([{type: 'm', modifiers: {...m, ctrlKey: true}}]);
    });

    it('should work with shift key', () => {
        expect(reactionCodeParser('shift+m')).toEqual([{type: 'm', modifiers: {...m, shiftKey: true}}]);
    });

    it('should work with alt key', () => {
        expect(reactionCodeParser('alt+m')).toEqual([{type: 'm', modifiers: {...m, altKey: true}}]);
    });

    it('should work with meta key', () => {
        expect(reactionCodeParser('meta+m')).toEqual([{type: 'm', modifiers: {...m, metaKey: true}}]);
    });

    it('should ignore spaces', () => {
        expect(reactionCodeParser(' ctrl   + shift +   alt + S ')).toEqual([{
            type: 's',
            modifiers: {...m, ctrlKey: true, shiftKey: true, altKey: true}
        }]);
    });

    it('should work with key aliases', () => {
        expect(reactionCodeParser('control+m')).toEqual(([{type: 'm', modifiers: {...m, ctrlKey: true}}]));
        expect(reactionCodeParser('command+m')).toEqual(([{type: 'm', modifiers: {...m, metaKey: true}}]));
        expect(reactionCodeParser('cmd+m')).toEqual(([{type: 'm', modifiers: {...m, metaKey: true}}]));
    });

    it('ignores unknown tokens', () => {
        expect(reactionCodeParser('mouse+ctrl+house+shift+click+alt')).toEqual([{
            type: 'mouse house click',
            modifiers: {...m, ctrlKey: true, shiftKey: true, altKey: true}
        }]);
    });
});

describe(reactionCodeToken.name, () => {
    it('should be a modifier', () => {
        expect(reactionCodeToken('ctrl')).toEqual({type: 'modifier', value: 'ctrl'});
        expect(reactionCodeToken('shift')).toEqual({type: 'modifier', value: 'shift'});
        expect(reactionCodeToken('alt')).toEqual({type: 'modifier', value: 'alt'});
        expect(reactionCodeToken('meta')).toEqual({type: 'modifier', value: 'meta'});
    });

    it('should not be a modifier', () => {
        expect(reactionCodeToken('m')).toEqual({type: 'type', value: 'm'});
        expect(reactionCodeToken('esc')).toEqual({type: 'type', value: 'esc'});
        expect(reactionCodeToken('backspace')).toEqual({type: 'type', value: 'backspace'});
    });
});

describe(isCodeModifier.name, () => {
    it('should be true', () => {
        expect(isCodeModifier('CTRL')).toBe(true, 'ctrl');
        expect(isCodeModifier('SHIFT')).toBe(true, 'shift');
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

describe(rewriteValue.name, () => {
    it('should rewrite values', () => {
        expect(rewriteValue('delete')).toBe('del');
        expect(rewriteValue('escape')).toBe('esc');
        expect(rewriteValue('back')).toBe('backspace');
        expect(rewriteValue('cmd')).toBe('meta');
        expect(rewriteValue('command')).toBe('meta');
        expect(rewriteValue('doubleclick')).toBe('dblclick');
        expect(rewriteValue('control')).toBe('ctrl');
    });

    it('should not rewrite values', () => {
        expect(rewriteValue('del')).toBe('del');
        expect(rewriteValue('esc')).toBe('esc');
        expect(rewriteValue('backspace')).toBe('backspace');
        expect(rewriteValue('meta')).toBe('meta');
        expect(rewriteValue('dblclick')).toBe('dblclick');
    });
});

describe(reactionRemoveModifiers.name, () => {
    it('should return type only', () => {
        expect(reactionRemoveModifiers([
            {type: 'modifier', value: 'ctrl'},
            {type: 'type', value: 'm'}
        ])).toEqual('m');
        expect(reactionRemoveModifiers([
            {type: 'modifier', value: 'ctrl'},
            {type: 'type', value: 'm'},
            {type: 'modifier', value: 'alt'}
        ])).toEqual('m');
        expect(reactionRemoveModifiers([
            {type: 'type', value: 'm'},
            {type: 'modifier', value: 'alt'}
        ])).toEqual('m');
        expect(reactionRemoveModifiers([
            {type: 'modifier', value: 'ctrl'},
            {type: 'type', value: 'a'},
            {type: 'type', value: 'b'}
        ])).toEqual('a b');
        expect(reactionRemoveModifiers([
            {type: 'type', value: 'm'}
        ])).toEqual('m');
    });

    it('should return empty string', () => {
        expect(reactionRemoveModifiers([])).toEqual('');
        expect(reactionRemoveModifiers([
            {type: 'modifier', value: 'ctrl'}
        ])).toEqual('');
        expect(reactionRemoveModifiers([
            {type: 'modifier', value: 'ctrl'},
            {type: 'modifier', value: 'alt'}
        ])).toEqual('');
    });
});

describe(reactionKeyModifiers.name, () => {
    it('should return modifiers', () => {
        expect(reactionKeyModifiers([{type: 'modifier', value: 'ctrl'}])).toEqual({...m, ctrlKey: true});
        expect(reactionKeyModifiers([{type: 'modifier', value: 'shift'}])).toEqual({...m, shiftKey: true});
        expect(reactionKeyModifiers([{type: 'modifier', value: 'alt'}])).toEqual({...m, altKey: true});
        expect(reactionKeyModifiers([{type: 'modifier', value: 'meta'}])).toEqual({...m, metaKey: true});
        expect(reactionKeyModifiers([
            {type: 'modifier', value: 'ctrl'},
            {type: 'modifier', value: 'shift'},
            {type: 'modifier', value: 'alt'},
            {type: 'modifier', value: 'meta'}
        ])).toEqual({ctrlKey: true, shiftKey: true, altKey: true, metaKey: true});
    });

    it('should throw for unknown modifiers', () => {
        expect(() => reactionKeyModifiers([{type: 'modifier', value: 'unknown'}])).toThrow(new Error('Unsupported modifier'))
    });

    it('should return default modifiers', () => {
        expect(reactionKeyModifiers([])).toEqual(m);
        expect(reactionKeyModifiers([{type: 'type', value: 'm'}])).toEqual(m);
    });
});
