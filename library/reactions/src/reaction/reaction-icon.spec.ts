import {reactionObjectEquals} from '../../tests/reaction-reducer.helper';
import {ReactionIcon, ReactionIconAnimate, reactionIconReducer} from './reaction-icon';

describe(reactionIconReducer.name, () => {
    const r = () => ({
        animate: ReactionIconAnimate.SPIN,
        icon: 'fa-plus',
        secondary: 'fa-document',
        secondaryAnimate: ReactionIconAnimate.PULSE
    } as ReactionIcon);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionIconReducer({}, {})));
    it('should have values', reactionObjectEquals(keys, reactionIconReducer({}, r()), r()));
});
