import {isObservable, of} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {Reaction, reactionReducer, ReactionState} from '../reaction/reaction';
import {reactionAnimateReducer, ReactionAnimateState} from '../reaction/reaction-animate';
import {reactionDisabledReducer, ReactionDisabledState} from '../reaction/reaction-disabled';
import {reactionStyleReducer, ReactionStyleState} from '../reaction/reaction-style';
import {reactionVisibleReducer, ReactionVisibleState} from '../reaction/reaction-visible';

/**
 * Combines all the states into a single interface.
 */
export interface ReactionStates extends ReactionState,
    ReactionAnimateState,
    ReactionDisabledState,
    ReactionStyleState,
    ReactionVisibleState {
}

/**
 * Converts a reaction object into a ReactionStates object.
 */
export function toReactionStates(reaction: Reaction): ReactionStates {
    let state$ = {};
    state$ = reactionReducer(state$, reaction);
    state$ = reactionAnimateReducer(state$, reaction);
    state$ = reactionDisabledReducer(state$, reaction);
    state$ = reactionStyleReducer(state$, reaction);
    state$ = reactionVisibleReducer(state$, reaction);

    Object.keys(state$).forEach(key => {
        state$[key] = isObservable(state$[key]) ? state$[key] : of(state$[key]);
        state$[key] = state$[key].pipe(
            defaultIfEmpty(undefined),
            distinctUntilChanged(),
            shareReplay(1)
        );
    });

    return state$ as ReactionStates;
}
