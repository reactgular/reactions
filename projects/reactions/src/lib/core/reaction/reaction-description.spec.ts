import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionDescription, reactionDescriptionReducer} from './reaction-description';

describe(reactionDescriptionReducer.name, () => {
    const r = () => ({description: 'A reaction description value.'} as ReactionDescription);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionDescriptionReducer({}, {})));
    it('should have values', reactionObjectEquals(keys, reactionDescriptionReducer({}, r()), r()));
});
