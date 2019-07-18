import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionDisabled, reactionDisabledReducer} from './reaction-disabled';

describe(reactionDisabledReducer.name, () => {
    const r = () => ({disabled: true} as ReactionDisabled);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionDisabledReducer({}, {}), {disabled: false}));
    it('should have values', reactionObjectEquals(keys, reactionDisabledReducer({}, r()), r()));
});
