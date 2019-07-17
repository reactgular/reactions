import {syncToArray} from '../../../tests/observable.helper';
import {reactionSnapshotDefaults} from '../../../tests/reaction-snapshot.helper';
import {ReactionSnapshotsPipe} from './reaction-snapshots.pipe';

describe(ReactionSnapshotsPipe.name, () => {
    it('should return undefined', () => {
        const pipe = new ReactionSnapshotsPipe();
        expect(pipe.transform(undefined)).toBe(undefined);
    });

    it('should return snapshot of defaults', () => {
        const pipe = new ReactionSnapshotsPipe();
        const snapshot$ = pipe.transform({});
        expect(syncToArray(snapshot$)).toEqual([reactionSnapshotDefaults()]);
    });
});
