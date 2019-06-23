import {reactionObjectEquals} from '../../tests/reaction-reducer.helper';
import {ReactionStyle, reactionStyleReducer} from './reaction-style';

describe(reactionStyleReducer.name, () => {
    const r = () => ({css: 'btn btn-sm btn-primary'} as ReactionStyle);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionStyleReducer({}, {}), {css: []}));
    it('should have values', reactionObjectEquals(keys, reactionStyleReducer({}, r()), {css: ['btn', 'btn-sm', 'btn-primary']}));
});
