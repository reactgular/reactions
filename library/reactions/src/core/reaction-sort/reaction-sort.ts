import {combineLatest, Observable, of} from 'rxjs';
import {toReactionState} from '../reaction-state/reaction-state';
import {map} from 'rxjs/operators';
import {reactionSortCompare, ReactionSortCompare} from './reaction-sort-compare';
import {reactionGroupNull} from './reaction-group-null';
import {ReactionObject} from '../reaction-types';

export const toSortCompares$ = (reactions: ReactionObject[]): Observable<ReactionSortCompare>[] => {
    return reactions.map(reaction => {
        const state$ = toReactionState(reaction);
        return combineLatest([state$.order, state$.group, of(reaction)]).pipe(
            map(([order, group, reaction]) => ({order, group, reaction}))
        );
    });
};

export const mapSortComparesToReaction = (states: ReactionSortCompare[]): ReactionSortCompare[] => {
    states = [...states];
    states.sort(reactionSortCompare);
    return states;
};

export const reactionSort = (reactions: ReactionObject[], minGroupSize: number = 0)
    : Observable<ReactionObject[]> => combineLatest(toSortCompares$(reactions))
    .pipe(
        map(mapSortComparesToReaction),
        map(sortables => reactionGroupNull(sortables, minGroupSize))
    );
