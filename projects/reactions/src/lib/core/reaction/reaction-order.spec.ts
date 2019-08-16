import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionOrder, reactionOrderReducer} from './reaction-order';

describe(reactionOrderReducer.name, () => {
    const r = () => ({order: '0000', group: 'ABCD'} as ReactionOrder);
    const keys = Object.keys(r());

    it('should set defaults of 0', reactionObjectEquals(keys, reactionOrderReducer({}, {}), {order: 0, group: 0}));
    it('should have values', reactionObjectEquals(keys, reactionOrderReducer({}, r()), r()));
});
