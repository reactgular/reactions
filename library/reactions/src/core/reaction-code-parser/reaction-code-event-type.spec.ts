import {reactionCodeEventType} from './reaction-code-event-type';
import {TOKEN_ALT, TOKEN_CTRL, TOKEN_DOCUMENT} from '../../../tests/reaction-code-token.helper';
import {ReactionCodeTypeEnum} from './reaction-code-tokenizer';

describe(reactionCodeEventType.name, () => {

    const l = (value) => ({type: ReactionCodeTypeEnum.LITERAL, value});

    it('should return keyup when source is document', () => {
        expect(reactionCodeEventType([TOKEN_DOCUMENT])).toEqual('keyup');
        expect(reactionCodeEventType([TOKEN_CTRL, l('a'), TOKEN_DOCUMENT])).toEqual('keyup');
    });

    it('should assume a single character literal is a keyup event', () => {
        expect(reactionCodeEventType([l('a')])).toEqual('keyup');
        expect(reactionCodeEventType([l('?')])).toEqual('keyup');
        expect(reactionCodeEventType([l('X')])).toEqual('keyup');
    });

    it('should assume title case literal is a keyup event', () => {
        expect(reactionCodeEventType([l('Escape')])).toEqual('keyup');
        expect(reactionCodeEventType([l('Backspace')])).toEqual('keyup');
        expect(reactionCodeEventType([l('Enter')])).toEqual('keyup');
        expect(reactionCodeEventType([l('Delete')])).toEqual('keyup');
    });

    it('should assume lowercase words are event type', () => {
        expect(reactionCodeEventType([l('click')])).toEqual('click');
        expect(reactionCodeEventType([l('dblclick')])).toEqual('dblclick');
        expect(reactionCodeEventType([l('mousemove')])).toEqual('mousemove');
        expect(reactionCodeEventType([l('blur')])).toEqual('blur');
    });

    it('should throw an error if type can not be inferred', () => {
        expect(() => reactionCodeEventType([])).toThrow();
        expect(() => reactionCodeEventType([TOKEN_CTRL])).toThrow();
        expect(() => reactionCodeEventType([TOKEN_CTRL, TOKEN_ALT])).toThrow();
    });

    it('should not throw an error is the source is document', () => {
        expect(() => reactionCodeEventType([TOKEN_DOCUMENT])).not.toThrow();
        expect(reactionCodeEventType([TOKEN_DOCUMENT])).toEqual('keyup');
    });
});
