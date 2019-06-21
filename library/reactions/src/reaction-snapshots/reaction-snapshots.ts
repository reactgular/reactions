import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {toReactionStates} from '../reaction-states/reaction-states';
import {ReactionDisabledSnapshot} from '../reaction-types/reaction-disabled';
import {ReactionIconSnapshot} from '../reaction-types/reaction-icon';
import {ReactionStyleSnapshot} from '../reaction-types/reaction-style';
import {ReactionTitleSnapshot} from '../reaction-types/reaction-title';
import {ReactionTooltipSnapshot} from '../reaction-types/reaction-tooltip';
import {ReactionVisibleSnapshot} from '../reaction-types/reaction-visible';
import {ReactionBase} from '../reaction-base/reaction-base';

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
export function toReactionSnapshots(reaction: ReactionBase): Observable<ReactionSnapshots> {
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
