import {of} from 'rxjs';
import {syncToArray} from '../../tests/observable.helper';
import {reactionSnapshotDefaults} from '../../tests/reaction-snapshot.helper';
import {toReactionSnapshot} from './reaction-snapshot';

describe(toReactionSnapshot.name, () => {
    it('should emit a snapshot of defaults', () => {
        const snapshot$ = toReactionSnapshot({});
        expect(syncToArray(snapshot$)).toEqual([reactionSnapshotDefaults()]);
    });

    it('should emit snapshots of changes', () => {
        const snapshot$ = toReactionSnapshot({
            title: of('Create'),
            icon: () => 'fa-plus',
            description: 'Creates a new document'
        });

        expect(syncToArray(snapshot$)).toEqual([{
            ...reactionSnapshotDefaults(),
            title: 'Create',
            icon: 'fa-plus',
            description: 'Creates a new document'
        }]);
    });
});
