import {Observable} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {reactionDescriptionReducer, ReactionDescriptionState} from '../reaction/reaction-description';
import {reactionDisabledReducer, ReactionDisabledState} from '../reaction/reaction-disabled';
import {reactionIconReducer, ReactionIconState} from '../reaction/reaction-icon';
import {reactionOrderReducer, ReactionOrderState} from '../reaction/reaction-order';
import {reactionStyleReducer, ReactionStyleState} from '../reaction/reaction-style';
import {reactionTitleReducer, ReactionTitleState} from '../reaction/reaction-title';
import {reactionTooltipReducer, ReactionTooltipState} from '../reaction/reaction-tooltip';
import {reactionVisibleReducer, ReactionVisibleState} from '../reaction/reaction-visible';
import {ReactionObject} from '../reaction/reaction-types';
import {hydrateReaction} from '../../utils/hydrate-reaction';

/**
 * Combines all the states into a single interface.
 */
export interface ReactionState extends ReactionDescriptionState,
    ReactionDisabledState,
    ReactionIconState,
    ReactionOrderState,
    ReactionStyleState,
    ReactionTitleState,
    ReactionTooltipState,
    ReactionVisibleState {
}

/**
 * Applies all the reducers to create a state object.
 */
export function reactionReducer(acc: ReactionObject, reaction: ReactionObject): ReactionState {
    acc = reactionDescriptionReducer(acc, reaction);
    acc = reactionDisabledReducer(acc, reaction);
    acc = reactionIconReducer(acc, reaction);
    acc = reactionOrderReducer(acc, reaction);
    acc = reactionStyleReducer(acc, reaction);
    acc = reactionTitleReducer(acc, reaction);
    acc = reactionTooltipReducer(acc, reaction);
    return reactionVisibleReducer(acc, reaction) as ReactionState;
}

/**
 * Applies operators to all of the object properties.
 */
export function reactionSharable(state: ReactionState): ReactionState {
    const lift = (source: Observable<any>) => source.pipe(
        defaultIfEmpty(undefined),
        distinctUntilChanged(),
        shareReplay(1)
    );
    return Object.keys(state).reduce((acc, key) => (acc[key] = lift(state[key]), acc), {}) as ReactionState;
}

/**
 * Converts a reaction object into a ReactionStates object.
 */
export function toReactionState(reaction: ReactionObject): ReactionState {
    if (!reaction.__STATE__) {
        reaction.__STATE__ = reactionSharable(reactionReducer({}, hydrateReaction(reaction)));
    }
    return reaction.__STATE__;
}

