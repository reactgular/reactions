import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from '../reaction-types';
import {reactionCodeParser} from './reaction-code-parser';
import {reactionCodeEventType} from './reaction-code-creator';

const m: ReactionCodeModifiers = REACTION_CODE_MODIFIERS;

describe(reactionCodeParser.name, () => {
    it('should work with ctrl key', () => {
        expect(reactionCodeParser('ctrl+m')).toEqual([{
            source: 'element',
            event: {...m, type: 'keyup', key: 'm', ctrlKey: true}
        }]);
    });

    it('should work with alt key', () => {
        expect(reactionCodeParser('alt+m')).toEqual([{
            source: 'element',
            event: {...m, type: 'keyup', key: 'm', altKey: true}
        }]);
    });

    it('should work with meta key', () => {
        expect(reactionCodeParser('meta+m')).toEqual([{
            source: 'element',
            event: {...m, type: 'keyup', key: 'm', metaKey: true}
        }]);
    });

    it('should ignore spaces', () => {
        expect(reactionCodeParser(' ctrl   +    alt + s ')).toEqual([{
            source: 'element',
            event: {...m, type: 'keyup', key: 's', ctrlKey: true, altKey: true}
        }]);
    });

    it('should work with key aliases', () => {
        expect(reactionCodeParser('control+m')).toEqual(([{
            source: 'element',
            event: {...m, type: 'keyup', key: 'm', ctrlKey: true}
        }]));

        expect(reactionCodeParser('command+m')).toEqual(([{
            source: 'element',
            event: {...m, type: 'keyup', key: 'm', metaKey: true}
        }]));

        expect(reactionCodeParser('cmd+m')).toEqual(([{
            source: 'element',
            event: {...m, type: 'keyup', key: 'm', metaKey: true}
        }]));
    });

    it('ignores unknown tokens', () => {
        expect(reactionCodeParser('mouse+ctrl+house+click+alt')).toEqual([{
            source: 'element',
            event: {...m, type: 'keyup', key: 'mouse house click', ctrlKey: true, altKey: true}
        }]);
    });
});

describe(reactionCodeEventType.name, () => {
    it('should return type only', () => {
        expect(reactionCodeEventType([
            {type: 'modifier', value: 'ctrl'},
            {type: 'type', value: 'm'},
            {type: 'source', value: 'document'}
        ])).toEqual('m');
        expect(reactionCodeEventType([
            {type: 'modifier', value: 'ctrl'},
            {type: 'type', value: 'm'},
            {type: 'modifier', value: 'alt'}
        ])).toEqual('m');
        expect(reactionCodeEventType([
            {type: 'type', value: 'm'},
            {type: 'modifier', value: 'alt'}
        ])).toEqual('m');
        expect(reactionCodeEventType([
            {type: 'modifier', value: 'ctrl'},
            {type: 'type', value: 'a'},
            {type: 'type', value: 'b'}
        ])).toEqual('a b');
        expect(reactionCodeEventType([
            {type: 'type', value: 'm'},
            {type: 'source', value: 'element'}
        ])).toEqual('m');
    });

    it('should return empty string', () => {
        expect(reactionCodeEventType([])).toEqual('');
        expect(reactionCodeEventType([
            {type: 'modifier', value: 'ctrl'}
        ])).toEqual('');
        expect(reactionCodeEventType([
            {type: 'modifier', value: 'ctrl'},
            {type: 'modifier', value: 'alt'}
        ])).toEqual('');
    });
});
