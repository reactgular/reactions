import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionIcon, reactionIconReducer} from './reaction-icon';

describe(reactionIconReducer.name, () => {
    const r = () => ({
        primary: 'fa-plus',
        secondary: 'fa-document'
    } as ReactionIcon);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionIconReducer({}, {})));
    it('should have values', reactionObjectEquals(keys, reactionIconReducer({}, r()), r()));
});
