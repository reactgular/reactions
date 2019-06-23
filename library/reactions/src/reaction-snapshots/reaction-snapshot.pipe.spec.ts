import {syncToArray} from '../../tests/observable.helper';
import {reactionSnapshotDefaults} from '../../tests/reaction-snapshot.helper';
import {ReactionSnapshotPipe} from './reaction-snapshot.pipe';

describe(ReactionSnapshotPipe.name, () => {
    it('should return undefined', () => {
        const pipe = new ReactionSnapshotPipe();
        expect(pipe.transform(undefined)).toBe(undefined);
    });

    it('should return snapshot of defaults', () => {
        const pipe = new ReactionSnapshotPipe();
        const snapshot$ = pipe.transform({});
        expect(syncToArray(snapshot$)).toEqual([reactionSnapshotDefaults()]);
    });
});
