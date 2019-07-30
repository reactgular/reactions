import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from '../reaction-types';
import {reactionCodeParser} from './reaction-code-parser';

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
