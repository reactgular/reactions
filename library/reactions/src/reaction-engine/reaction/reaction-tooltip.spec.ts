import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionTooltip, reactionTooltipReducer} from './reaction-tooltip';

describe(reactionTooltipReducer.name, () => {
    const r = () => ({tooltip: 'Create new document'} as ReactionTooltip);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionTooltipReducer({}, {})));
    it('should have values', reactionObjectEquals(keys, reactionTooltipReducer({}, r()), r()));
});
