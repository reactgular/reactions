import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {toReactionState} from '../reaction-state/reaction-state';
import {ReactionDescriptionSnapshot} from '../reaction/reaction-description';
import {ReactionDisabledSnapshot} from '../reaction/reaction-disabled';
import {ReactionIconSnapshot} from '../reaction/reaction-icon';
import {ReactionOrderSnapshot} from '../reaction/reaction-order';
import {ReactionStyleSnapshot} from '../reaction/reaction-style';
import {ReactionTitleSnapshot} from '../reaction/reaction-title';
import {ReactionTooltipSnapshot} from '../reaction/reaction-tooltip';
import {ReactionVisibleSnapshot} from '../reaction/reaction-visible';
import {ReactionObject} from '../reaction/reaction-types';

/**
 * A snapshot of the reaction state.
 */
export interface ReactionSnapshot extends ReactionDescriptionSnapshot,
    ReactionDisabledSnapshot,
    ReactionIconSnapshot,
    ReactionOrderSnapshot,
    ReactionStyleSnapshot,
    ReactionTitleSnapshot,
    ReactionTooltipSnapshot,
    ReactionVisibleSnapshot {
}

/**
 * Creates an observable that emits a snapshots (state object) of a reaction.
 */
export function toReactionSnapshot(reaction: ReactionObject): Observable<ReactionSnapshot> {
    const state$ = toReactionState(reaction);

    const combine$: Observable<{ key: string, value: any }>[] = Object
        .keys(state$)
        .map(key => state$[key].pipe(map(value => ({key, value}))));

    return combineLatest(combine$)
        .pipe(map(values => values.reduce((acc, next) => (acc[next.key] = next.value, acc), {}) as ReactionSnapshot));
}
