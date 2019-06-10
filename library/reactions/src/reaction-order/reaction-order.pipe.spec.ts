import {Reaction} from '../reaction/reaction';
import {ReactionOrderPipe} from './reaction-order.pipe';

describe(ReactionOrderPipe.name, () => {
    it('should sort by order', () => {
        let reactions = ['c', 'r', 'a', 'p'].map(order => ({config: {order}}));
        const pipe = new ReactionOrderPipe();
        reactions = pipe.transform(reactions as Reaction[]);
        expect(reactions.map(r => r.config.order)).toEqual(['a', 'c', 'p', 'r']);
    });
});
