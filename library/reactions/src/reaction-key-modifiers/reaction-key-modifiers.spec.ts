import {REACTION_KEY_MODIFIERS, ReactionKeyModifiers, reactionKeyModifiers} from './reaction-key-modifiers';

describe(reactionKeyModifiers.name, () => {

    const m: ReactionKeyModifiers = REACTION_KEY_MODIFIERS;

    function mapBoolean(acc: Partial<ReactionKeyModifiers>, key: string): Partial<ReactionKeyModifiers>[] {
        return [true, false].map(value => ({...acc, [key]: value}));
    }

    // function stringify(mod: ReactionKeyModifiers, key: string, delimiter: string): string {
    //     return [
    //         mod.ctrlKey && 'ctrl',
    //         mod.shiftKey && 'shift',
    //         mod.altKey && 'alt',
    //         key
    //     ].filter(Boolean).join(delimiter);
    // }
    //
    // it('should', () => {
    //     const expected: ReactionKeyModifiers[] = mapBoolean({}, 'ctrlKey')
    //         .reduce((acc, next) => [...acc, ...mapBoolean(next, 'altKey')], [])
    //         .reduce((acc, next) => [...acc, ...mapBoolean(next, 'shiftKey')], []);
    //
    //     const values = [
    //         ...expected.map(expect => ({value: stringify(expect, 'b', '+'), expect})),
    //         ...expected.map(expect => ({value: stringify(expect, 'b', ' + '), expect})),
    //         ...expected.map(expect => ({value: stringify(expect, 'b', '+').toUpperCase(), expect}))
    //     ];
    // });

    it('should work with ctrl key', () => {
        expect(reactionKeyModifiers('ctrl+m')).toEqual({...m, ctrlKey: true});
    });

    it('should work with shift key', () => {
        expect(reactionKeyModifiers('shift+m')).toEqual({...m, shiftKey: true});
    });

    it('should work with alt key', () => {
        expect(reactionKeyModifiers('alt+m')).toEqual({...m, altKey: true});
    });

    it('should work with meta key', () => {
        expect(reactionKeyModifiers('meta+m')).toEqual({...m, metaKey: true});
    });

    it('should ignore spaces', () => {
        expect(reactionKeyModifiers(' ctrl   + shift +   alt + S ')).toEqual({...m, ctrlKey: true, shiftKey: true, altKey: true});
    });

    it('should work with key aliases', () => {

    });

    it('should work with upper case', () => {

    });

    it('should work with lower case', () => {

    });
});
