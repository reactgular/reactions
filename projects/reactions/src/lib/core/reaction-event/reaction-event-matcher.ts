import {ReactionEventMatcher} from '../reaction-types';

export function reactionEventMatcher(event: Event, matcher: ReactionEventMatcher): boolean {
    return Object.entries(matcher).every(([key, value]) => event[key] === value);
}
