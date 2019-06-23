import {ReactionOrderPipe} from './reaction-order.pipe';
import {ReactionObject} from '../reaction/reaction';

describe(ReactionOrderPipe.name, () => {
    it('should sort by order', () => {
        let reactions = ['c', 'r', 'a', 'p'].map(order => ({config: {order}}));
        const pipe = new ReactionOrderPipe();
        reactions = pipe.transform(reactions as ReactionObject[]);
        expect(reactions.map(r => r.config.order)).toEqual(['a', 'c', 'p', 'r']);
    });
});
