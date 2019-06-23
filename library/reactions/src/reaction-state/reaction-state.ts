import {defaultIfEmpty, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {toObservable} from '../reaction-utils/observables';
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
 * Converts a reaction object into a ReactionStates object.
 */
export function toReactionStates(reaction: ReactionObject): ReactionState {
    let state$ = {};
    state$ = reactionDescriptionReducer(state$, reaction);
    state$ = reactionDisabledReducer(state$, reaction);
    state$ = reactionIconReducer(state$, reaction);
    state$ = reactionOrderReducer(state$, reaction);
    state$ = reactionStyleReducer(state$, reaction);
    state$ = reactionTitleReducer(state$, reaction);
    state$ = reactionTooltipReducer(state$, reaction);
    state$ = reactionVisibleReducer(state$, reaction);

    Object.keys(state$).forEach(key => {
        state$[key] = toObservable(state$[key]);
        state$[key] = state$[key].pipe(
            defaultIfEmpty(undefined),
            distinctUntilChanged(),
            shareReplay(1)
        );
    });

    return state$ as ReactionState;
}

