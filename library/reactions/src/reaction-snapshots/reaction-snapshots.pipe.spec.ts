import {ReactionSnapshotsPipe} from './reaction-snapshots.pipe';

describe(ReactionSnapshotsPipe.name, () => {
    it('create an instance', () => {
        const pipe = new ReactionSnapshotsPipe();
        expect(pipe).toBeTruthy();
    });
});
