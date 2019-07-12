import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionOrder, reactionOrderReducer} from './reaction-order';

describe(reactionOrderReducer.name, () => {
    const r = () => ({order: 'ABCD:0000'} as ReactionOrder);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionOrderReducer({}, {}), {order: '0'}));
    it('should have values', reactionObjectEquals(keys, reactionOrderReducer({}, r()), r()));
});
