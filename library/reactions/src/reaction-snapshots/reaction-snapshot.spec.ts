import {of} from 'rxjs';
import {syncToArray} from '../../tests/observable.helper';
import {reactionSnapshotDefaults} from '../../tests/reaction-snapshot.helper';
import {toReactionSnapshot} from './reaction-snapshot';
import {Reaction} from '../reaction/reaction';
import {hydrateReaction} from '../reaction-utils/hydrate-reaction';

describe(toReactionSnapshot.name, () => {
    @Reaction({title: 'Create', description: 'Creates a new document'})
    class CreateDocument {
    }


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

    it('should create snapshots from meta data', () => {
        const action = new CreateDocument();
        const snapshot$ = toReactionSnapshot(hydrateReaction(action));
        expect(syncToArray(snapshot$)).toEqual([{
            ...reactionSnapshotDefaults(),
            title: 'Create',
            description: 'Creates a new document'
        }]);
    });
});
