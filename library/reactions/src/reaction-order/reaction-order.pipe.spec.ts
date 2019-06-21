import {ReactionOrderPipe} from './reaction-order.pipe';
import {ReactionBase} from '../reaction-base/reaction-base';

describe(ReactionOrderPipe.name, () => {
    it('should sort by order', () => {
        let reactions = ['c', 'r', 'a', 'p'].map(order => ({config: {order}}));
        const pipe = new ReactionOrderPipe();
        reactions = pipe.transform(reactions as ReactionBase[]);
        expect(reactions.map(r => r.config.order)).toEqual(['a', 'c', 'p', 'r']);
    });
});
