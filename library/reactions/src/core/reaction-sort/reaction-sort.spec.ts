import {mapSortComparesToReaction, reactionSort, toSortCompares$} from './reaction-sort';
import {syncFirst} from '../../../tests/observable.helper';
import {ReactionSortCompare} from './reaction-sort-compare';
import {Observable} from 'rxjs';
import {ReactionObject} from '../reaction/reaction-types';

describe(toSortCompares$.name, () => {
    it('should convert reaction objects to sortable objects', () => {
        const r = (order, group, x) => ({order, group, x});
        const r1 = r(0, 0, 1), r2 = r(1, 1, 2), r3 = r(2, 2, 3);

        // converts to an array of observables
        const sortCompares$ = toSortCompares$([r1, r2, r3]);
        expect(sortCompares$.length).toBe(3);

        // reaction has been hydrated. Map to something easier to equal.
        const mapToR = (sort: ReactionSortCompare) => ({order: sort.order, group: sort.order, reaction: {x: sort.reaction.x}});

        // first emitted values should be sortable objects
        expect(mapToR(syncFirst(sortCompares$[0]))).toEqual({order: 0, group: 0, reaction: {x: 1}});
        expect(mapToR(syncFirst(sortCompares$[1]))).toEqual({order: 1, group: 1, reaction: {x: 2}});
        expect(mapToR(syncFirst(sortCompares$[2]))).toEqual({order: 2, group: 2, reaction: {x: 3}});
    });
});

describe(mapSortComparesToReaction.name, () => {
    const g = (order, group, x) => ({order, group, reaction: {x}});
    it('should not change the order when using defaults', () => {
        const r1 = g(0, 0, 1), r2 = g(0, 0, 2), r3 = g(0, 0, 3), r4 = g(0, 0, 4);
        const r5 = g(0, 0, 5), r6 = g(0, 0, 6), r7 = g(0, 0, 7), r8 = g(0, 0, 8);
        const sorted = mapSortComparesToReaction([r1, r2, r3, r4, r5, r6, r7, r8]);
        expect(sorted).toEqual([r1, r2, r3, r4, r5, r6, r7, r8]);
    });

    it('should sort by group, but keep original order', () => {
        const r1 = g(0, 2, 1), r2 = g(0, 2, 2), r3 = g(0, 2, 3), r4 = g(0, 2, 4);
        const r5 = g(0, 1, 5), r6 = g(0, 1, 6), r7 = g(0, 1, 7), r8 = g(0, 1, 8);
        const sorted = mapSortComparesToReaction([r1, r2, r3, r4, r5, r6, r7, r8]);
        expect(sorted).toEqual([r5, r6, r7, r8, r1, r2, r3, r4]);
    });

    it('should sort by order and group', () => {
        const r1 = g(3, 2, 1), r2 = g(4, 2, 2), r3 = g(0, 0, 3), r4 = g(1, 0, 4);
        const r5 = g(3, 1, 5), r6 = g(7, 1, 6), r7 = g(3, 2, 7), r8 = g(3, 2, 8);
        const sorted = mapSortComparesToReaction([r1, r2, r3, r4, r5, r6, r7, r8]);
        expect(sorted).toEqual([
            g(0, 0, 3),
            g(1, 0, 4),
            g(3, 1, 5),
            g(7, 1, 6),
            g(3, 2, 1),
            g(3, 2, 7),
            g(3, 2, 8),
            g(4, 2, 2)
        ]);
    });
});

describe(reactionSort.name, () => {
    const r = (order, group, x) => ({order, group, x});
    const mapToR = ({order, group, x}) => ({order, group, x});
    const r1 = r(3, 2, 1), r2 = r(4, 2, 2), r3 = r(0, 0, 3), r4 = r(1, 0, 4);
    const r5 = r(3, 1, 5), r6 = r(7, 1, 6), r7 = r(3, 2, 7), r8 = r(3, 2, 8);
    const sortToArray = (reactions$: Observable<ReactionObject[]>) => syncFirst(reactions$).map(r => r === null ? null : mapToR(r as any));

    it('should not split groups with a null', () => {
        const reactions$ = reactionSort([r1, r2, r3, r4, r5, r6, r7, r8], 0);
        expect(sortToArray(reactions$)).toEqual([
            r(0, 0, 3),
            r(1, 0, 4),
            r(3, 1, 5),
            r(7, 1, 6),
            r(3, 2, 1),
            r(3, 2, 7),
            r(3, 2, 8),
            r(4, 2, 2)
        ]);
    });

    it('should split groups with a null', () => {
        const reactions$ = reactionSort([r1, r2, r3, r4, r5, r6, r7, r8], 1);
        expect(sortToArray(reactions$)).toEqual([
            r(0, 0, 3),
            r(1, 0, 4),
            null,
            r(3, 1, 5),
            r(7, 1, 6),
            null,
            r(3, 2, 1),
            r(3, 2, 7),
            r(3, 2, 8),
            r(4, 2, 2)
        ]);
    });

    it('should split groups with a min group size of 4', () => {
        const reactions$ = reactionSort([r1, r2, r3, r4, r5, r6, r7, r8], 4);
        expect(sortToArray(reactions$)).toEqual([
            r(0, 0, 3),
            r(1, 0, 4),
            r(3, 1, 5),
            r(7, 1, 6),
            null,
            r(3, 2, 1),
            r(3, 2, 7),
            r(3, 2, 8),
            r(4, 2, 2)
        ]);
    });
});
