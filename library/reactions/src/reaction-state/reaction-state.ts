import {defaultIfEmpty, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {ReactionObject} from '../reaction/reaction';
import {reactionDescriptionReducer, ReactionDescriptionState} from '../reaction/reaction-description';
import {reactionDisabledReducer, ReactionDisabledState} from '../reaction/reaction-disabled';
import {reactionIconReducer, ReactionIconState} from '../reaction/reaction-icon';
import {reactionOrderReducer, ReactionOrderState} from '../reaction/reaction-order';
import {reactionStyleReducer, ReactionStyleState} from '../reaction/reaction-style';
import {reactionTitleReducer, ReactionTitleState} from '../reaction/reaction-title';
import {reactionTooltipReducer, ReactionTooltipState} from '../reaction/reaction-tooltip';
import {reactionVisibleReducer, ReactionVisibleState} from '../reaction/reaction-visible';

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
function reactionReducer(acc: ReactionObject, reaction: ReactionObject): ReactionObject {
    acc = reactionDescriptionReducer(acc, reaction);
    acc = reactionDisabledReducer(acc, reaction);
    acc = reactionIconReducer(acc, reaction);
    acc = reactionOrderReducer(acc, reaction);
    acc = reactionStyleReducer(acc, reaction);
    acc = reactionTitleReducer(acc, reaction);
    acc = reactionTooltipReducer(acc, reaction);
    return reactionVisibleReducer(acc, reaction);
}

/**
 * Applies operators to all of the object properties.
 */
function reactionSharable(state: ReactionState): ReactionState {
    Object.keys(state).forEach(key => {
        state[key] = state[key].pipe(
            defaultIfEmpty(undefined),
            distinctUntilChanged(),
            shareReplay(1)
        );
    });
    return state;
}

/**
 * Converts a reaction object into a ReactionStates object.
 */
export function toReactionState(reaction: ReactionObject): ReactionState {
    return reactionSharable(reactionReducer({}, reaction) as ReactionState);
}

