import {reactionObjectEquals} from '../../../tests/reaction-reducer.helper';
import {ReactionTitle, reactionTitleReducer} from './reaction-title';

describe(reactionTitleReducer.name, () => {
    const r = () => ({title: 'Create new document'} as ReactionTitle);
    const keys = Object.keys(r());

    it('should defaults of undefined', reactionObjectEquals(keys, reactionTitleReducer({}, {}), {title: 'n/a'}));
    it('should have values', reactionObjectEquals(keys, reactionTitleReducer({}, r()), r()));
});
