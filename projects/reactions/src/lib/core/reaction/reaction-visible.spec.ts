import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionVisible, reactionVisibleReducer} from './reaction-visible';

describe(reactionVisibleReducer.name, () => {
    const r = () => ({visible: false} as ReactionVisible);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionVisibleReducer({}, {}), {visible: true}));
    it('should have values', reactionObjectEquals(keys, reactionVisibleReducer({}, r()), r()));
});
