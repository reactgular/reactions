import {ReactionOrderPipe} from './reaction-order.pipe';

describe(ReactionOrderPipe.name, () => {
    it('create an instance', () => {
        const pipe = new ReactionOrderPipe();
        expect(pipe).toBeTruthy();
    });
});
