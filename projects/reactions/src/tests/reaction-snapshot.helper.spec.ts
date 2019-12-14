import {toReactionSnapshot} from '../lib/core/reaction-snapshot/reaction-snapshot';
import {reactionSnapshotDefaults} from './reaction-snapshot.helper';

describe(reactionSnapshotDefaults.name, () => {
    it('should match the defaults of an empty reaction', async () => {
        const snapshot$ = toReactionSnapshot({});
        const snapshot = await snapshot$.toPromise();
        expect(snapshot).toEqual(reactionSnapshotDefaults());
    });
});
