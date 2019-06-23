import {forkJoin, Observable, of} from 'rxjs';
import {syncToArray} from '../../tests/observable.helper';
import {reactionObjectEquals} from '../../tests/reaction-reducer.helper';
import {reactionSnapshotDefaults} from '../../tests/reaction-snapshot.helper';
import {ReactionSnapshot} from '../reaction-snapshots/reaction-snapshot';
import {reactionReducer, reactionSharable, ReactionState, toReactionState} from './reaction-state';

describe(reactionReducer.name, () => {
    const r = reactionSnapshotDefaults;
    const keys = Object.keys(r());
    it('should reduce to defaults', reactionObjectEquals(keys, reactionReducer({}, r()), r()));
});

describe(reactionSharable.name, () => {
    it('should lift all observables', () => {
        const snapshot = reactionSnapshotDefaults();
        const s1$ = Object.keys(snapshot).reduce((acc, key) => (acc[key] = of(snapshot[key]), acc), {}) as ReactionState;
        const S2$ = reactionSharable(s1$);
        expect(S2$).not.toBe(s1$);
    });
});

describe(toReactionState.name, () => {
    it('should create a reaction state object with defaults', () => {
        const state$ = toReactionState({});
        expect(syncToArray(forkJoin(state$) as Observable<ReactionSnapshot>))
            .toEqual([reactionSnapshotDefaults()]);
    });
});
