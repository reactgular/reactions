import {syncToArray} from '../../tests/observable.helper';
import {ReactionSnapshot} from './reaction-snapshot';
import {ReactionSnapshotPipe} from './reaction-snapshot.pipe';

describe(ReactionSnapshotPipe.name, () => {
    const defaults = () => ({
        description: undefined,
        disabled: false,
        icon: undefined,
        animate: undefined,
        secondary: undefined,
        secondaryAnimate: undefined,
        order: '0',
        css: [],
        title: 'n/a',
        tooltip: undefined,
        visible: true
    } as ReactionSnapshot);

    it('should return undefined', () => {
        const pipe = new ReactionSnapshotPipe();
        expect(pipe.transform(undefined)).toBe(undefined);
    });

    it('should return snapshot of defaults', () => {
        const pipe = new ReactionSnapshotPipe();
        const snapshot$ = pipe.transform({});
        expect(syncToArray(snapshot$)).toEqual([defaults()]);
    });
});
