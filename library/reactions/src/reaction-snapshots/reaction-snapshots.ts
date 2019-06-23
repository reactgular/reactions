import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {toReactionStates} from '../reaction-states/reaction-states';
import {ReactionDisabledSnapshot} from '../reaction/reaction-disabled';
import {ReactionIconSnapshot} from '../reaction/reaction-icon';
import {ReactionStyleSnapshot} from '../reaction/reaction-style';
import {ReactionTitleSnapshot} from '../reaction/reaction-title';
import {ReactionTooltipSnapshot} from '../reaction/reaction-tooltip';
import {ReactionVisibleSnapshot} from '../reaction/reaction-visible';

/**
 * A snapshot of the reaction state.
 */
export interface ReactionSnapshots extends ReactionTitleSnapshot,
    ReactionDisabledSnapshot,
    ReactionIconSnapshot,
    ReactionStyleSnapshot,
    ReactionTooltipSnapshot,
    ReactionVisibleSnapshot {
}

/**
 * Creates an observable that emits a snapshots (state object) of a reaction.
 */
export function toReactionSnapshots(reaction: unknown): Observable<ReactionSnapshots> {
    const state$ = toReactionStates(reaction);

    const combined$: Observable<{ key: string, value: any }>[] = Object.keys(state$).map(key => {
        return state$[key].pipe(map(value => {
            return {key: key.replace('$', ''), value};
        }));
    });

    return combineLatest(combined$).pipe(
        map(values => {
            return values.reduce((acc, next) => (acc[next.key] = next.value, acc), {}) as ReactionSnapshots;
        })
    );
}
