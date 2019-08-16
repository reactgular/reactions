import {REACTION_CODE_MODIFIERS, ReactionCode, ReactionCodeModifiers} from '../reaction-types';
import {reactionCodeParser} from './reaction-code-parser';

const m: ReactionCodeModifiers = REACTION_CODE_MODIFIERS;
const key = (key: string, modifiers: ReactionCodeModifiers): ReactionCode => ({
    source: 'document',
    event: {type: 'keyup', key, ...modifiers}
});
const el = (type: string, modifiers: ReactionCodeModifiers): ReactionCode => ({
    source: 'element',
    event: {type, ...modifiers}
});

describe(reactionCodeParser.name, () => {

    describe('keyboard codes', () => {
        it('should assume a single character is a keyboard code', () => {
            expect(reactionCodeParser('?')).toEqual([key('?', m)]);
        });

        it('should assume title case words are a keyboard code', () => {
            expect(reactionCodeParser('Escape')).toEqual([key('Escape', m)]);
        });

        it('should work with modifier keys', () => {
            expect(reactionCodeParser('ctrl+m')).toEqual([key('m', {...m, ctrlKey: true})]);
            expect(reactionCodeParser('alt+m')).toEqual([key('m', {...m, altKey: true})]);
            expect(reactionCodeParser('meta+m')).toEqual([key('m', {...m, metaKey: true})]);
        });
    });

    describe('mouse codes', () => {
        it('should assume lowercase words are element codes', () => {
            expect(reactionCodeParser('click')).toEqual([el('click', m)]);
            expect(reactionCodeParser('blur')).toEqual([el('blur', m)]);
            expect(reactionCodeParser('contextmenu')).toEqual([el('contextmenu', m)]);
            expect(reactionCodeParser('dblclick')).toEqual([el('dblclick', m)]);
            expect(reactionCodeParser('mouseenter')).toEqual([el('mouseenter', m)]);
            expect(reactionCodeParser('mouseleave')).toEqual([el('mouseleave', m)]);
        });
    });

    describe('support multiple codes', () => {
        it('should combine mouse and keyboard codes', () => {
            expect(reactionCodeParser('click, ctrl+n')).toEqual([
                el('click', m),
                key('n', {...m, ctrlKey: true})
            ]);
        });

        it('should create multiple mouse codes', () => {
            expect(reactionCodeParser('click, dblclick')).toEqual([el('click', m), el('dblclick', m)]);
        });

        it('should create multiple keyboard codes', () => {
            expect(reactionCodeParser('?, ctrl+h')).toEqual([
                key('?', m),
                key('h', {...m, ctrlKey: true})
            ]);
        });
    });

    it('should ignore spaces', () => {
        expect(reactionCodeParser(' ctrl   +    alt + s ')).toEqual([key('s', {...m, ctrlKey: true, altKey: true})]);
    });

    it('should work with modifier aliases', () => {
        expect(reactionCodeParser('control+m')).toEqual(([key('m', {...m, ctrlKey: true})]));
        expect(reactionCodeParser('command+m')).toEqual(([key('m', {...m, metaKey: true})]));
        expect(reactionCodeParser('cmd+m')).toEqual(([key('m', {...m, metaKey: true})]));
    });
});
