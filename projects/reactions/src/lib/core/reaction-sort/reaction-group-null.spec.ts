import {reactionGroupNull} from './reaction-group-null';

describe(reactionGroupNull.name, () => {
    const r1 = {x: 1}, r2 = {x: 2}, r3 = {x: 3}, r4 = {x: 4};
    const r5 = {x: 5}, r6 = {x: 6}, r7 = {x: 7}, r8 = {x: 8};
    const r = (group, reaction) => ({group, reaction});

    it('should not group the array', () => {
        const exp = [r(1, r1), r(2, r2), r(3, r3), r(4, r4), r(5, r5), r(6, r6), r(7, r7), r(8, r8)];
        expect(reactionGroupNull(exp, 0)).toEqual([
            {x: 1},
            {x: 2},
            {x: 3},
            {x: 4},
            {x: 5},
            {x: 6},
            {x: 7},
            {x: 8}
        ]);
    });

    it('should return an empty array', () => {
        expect(reactionGroupNull([], 1)).toEqual([]);
    });

    it('should split groups with a null', () => {
        expect(reactionGroupNull([r(1, r1), r(2, r2), r(3, r3), r(4, r4)], 1)).toEqual([r1, null, r2, null, r3, null, r4]);
        expect(reactionGroupNull([r(1, r1), r(1, r2), r(2, r3), r(2, r4)], 1)).toEqual([r1, r2, null, r3, r4]);
        expect(reactionGroupNull([r(1, r1), r(1, r2), r(2, r3), r(3, r4)], 1)).toEqual([r1, r2, null, r3, null, r4]);
    });

    it('should split with min group size', () => {
        const exp = [r(1, r1), r(2, r2), r(3, r3), r(4, r4), r(5, r5), r(6, r6), r(7, r7), r(8, r8)];
        expect(reactionGroupNull(exp, 1)).toEqual([r1, null, r2, null, r3, null, r4, null, r5, null, r6, null, r7, null, r8]);
        expect(reactionGroupNull(exp, 2)).toEqual([r1, r2, null, r3, r4, null, r5, r6, null, r7, r8]);
        expect(reactionGroupNull(exp, 3)).toEqual([r1, r2, r3, null, r4, r5, r6, null, r7, r8]);
        expect(reactionGroupNull(exp, 4)).toEqual([r1, r2, r3, r4, null, r5, r6, r7, r8]);
        expect(reactionGroupNull(exp, 5)).toEqual([r1, r2, r3, r4, r5, null, r6, r7, r8]);
        expect(reactionGroupNull(exp, 6)).toEqual([r1, r2, r3, r4, r5, r6, null, r7, r8]);
        expect(reactionGroupNull(exp, 7)).toEqual([r1, r2, r3, r4, r5, r6, r7, null, r8]);
        expect(reactionGroupNull(exp, 8)).toEqual([r1, r2, r3, r4, r5, r6, r7, r8]);
    });

    it('should merge a group if group too small', () => {
        const exp = [r(1, r1), r(1, r2), r(2, r3), r(2, r4), r(3, r5), r(3, r6), r(3, r7), r(3, r8)];
        expect(reactionGroupNull(exp, 4)).toEqual([r1, r2, r3, r4, null, r5, r6, r7, r8]);
    });
});
