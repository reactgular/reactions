import {ReactionStatePipe} from './reaction-state.pipe';
import {syncFirst} from '../../../tests/observable.helper';
import {reactionSnapshotDefaults} from '../../../tests/reaction-snapshot.helper';

describe(ReactionStatePipe.name, () => {
    it('should return undefined for undefined', () => {
        const pipe = new ReactionStatePipe();
        expect(pipe.transform(undefined)).toBe(undefined);
    });

    it('should create observable properties that emit the default state', () => {
        const pipe = new ReactionStatePipe();
        const reaction$ = pipe.transform({});
        const snapshot = Object.entries(reaction$).reduce((acc, next) => (acc[next[0]] = syncFirst(next[1]), acc), {});
        expect(snapshot).toEqual(reactionSnapshotDefaults());
    });
});
