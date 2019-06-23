import {defaultIfEmpty, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {reactionDisabledReducer, ReactionDisabledState} from '../reaction/reaction-disabled';
import {reactionIconReducer, ReactionIconState} from '../reaction/reaction-icon';
import {reactionStyleReducer, ReactionStyleState} from '../reaction/reaction-style';
import {reactionTitleReducer, ReactionTitleState} from '../reaction/reaction-title';
import {reactionTooltipReducer, ReactionTooltipState} from '../reaction/reaction-tooltip';
import {reactionVisibleReducer, ReactionVisibleState} from '../reaction/reaction-visible';
import {toObservable} from '../reaction-utils/observables';

/**
 * Combines all the states into a single interface.
 */
export interface ReactionStates extends ReactionTitleState,
    ReactionDisabledState,
    ReactionIconState,
    ReactionStyleState,
    ReactionTooltipState,
    ReactionVisibleState {
}

/**
 * Converts a reaction object into a ReactionStates object.
 */
export function toReactionStates(reaction: unknown): ReactionStates {
    let state$ = {};
    state$ = reactionTitleReducer(state$, reaction);
    state$ = reactionDisabledReducer(state$, reaction);
    state$ = reactionIconReducer(state$, reaction);
    state$ = reactionStyleReducer(state$, reaction);
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

    return state$ as ReactionStates;
}
