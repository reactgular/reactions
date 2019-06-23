import {of} from 'rxjs';
import {syncToArray} from '../../tests/observable.helper';
import {ReactionSnapshot, toReactionSnapshot} from './reaction-snapshot';

describe(toReactionSnapshot.name, () => {
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

    it('should emit a snapshot of defaults', () => {
        const snapshot$ = toReactionSnapshot({});
        expect(syncToArray(snapshot$)).toEqual([defaults()]);
    });

    it('should emit snapshots of changes', () => {
        const snapshot$ = toReactionSnapshot({
            title: of('Create'),
            icon: () => 'fa-plus',
            description: 'Creates a new document'
        });

        expect(syncToArray(snapshot$)).toEqual([{
            ...defaults(),
            title: 'Create',
            icon: 'fa-plus',
            description: 'Creates a new document'
        }]);
    });
});
