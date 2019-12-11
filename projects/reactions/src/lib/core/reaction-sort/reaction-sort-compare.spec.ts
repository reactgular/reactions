import {ReactionSortCompare, reactionSortCompare} from './reaction-sort-compare';

describe(reactionSortCompare.name, () => {
    const order = 0, group = 0, reaction = undefined;

    it('should sort by order', () => {
        expect(reactionSortCompare({order: 1, group, reaction}, {order: 5, group, reaction})).toBe(-1);
        expect(reactionSortCompare({order: 5, group, reaction}, {order: 1, group, reaction})).toBe(1);
        expect(reactionSortCompare({order: 8, group, reaction}, {order: 8, group, reaction})).toBe(0);
    });

    it('should sort by group', () => {
        expect(reactionSortCompare({order, group: 1, reaction}, {order, group: 5, reaction})).toBe(-1);
        expect(reactionSortCompare({order, group: 5, reaction}, {order, group: 1, reaction})).toBe(1);
        expect(reactionSortCompare({order, group: 8, reaction}, {order, group: 8, reaction})).toBe(0);
    });

    it('should sort by group and order', () => {
        expect(reactionSortCompare({order: 1, group: 1, reaction}, {order: 5, group: 5, reaction})).toBe(-1);
        expect(reactionSortCompare({order: 1, group: 5, reaction}, {order: 5, group: 1, reaction})).toBe(1);
        expect(reactionSortCompare({order: 5, group: 1, reaction}, {order: 1, group: 5, reaction})).toBe(-1);
        expect(reactionSortCompare({order: 5, group: 5, reaction}, {order: 1, group: 1, reaction})).toBe(1);
    });
});
