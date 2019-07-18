import {ReactionSortPipe} from './reaction-sort.pipe';

describe(ReactionSortPipe.name, () => {
    it('create an instance', () => {
        const pipe = new ReactionSortPipe();
        expect(pipe).toBeTruthy();
    });
});
