import {defaultIfEmpty, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {reactionDisabledReducer, ReactionDisabledState} from '../reaction-types/reaction-disabled';
import {reactionIconReducer, ReactionIconState} from '../reaction-types/reaction-icon';
import {reactionStyleReducer, ReactionStyleState} from '../reaction-types/reaction-style';
import {reactionTitleReducer, ReactionTitleState} from '../reaction-types/reaction-title';
import {reactionTooltipReducer, ReactionTooltipState} from '../reaction-types/reaction-tooltip';
import {reactionVisibleReducer, ReactionVisibleState} from '../reaction-types/reaction-visible';
import {toObservable} from '../reaction-utils/observables';
import {ReactionBase} from '../reaction-base/reaction-base';

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
export function toReactionStates(reaction: ReactionBase): ReactionStates {
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
