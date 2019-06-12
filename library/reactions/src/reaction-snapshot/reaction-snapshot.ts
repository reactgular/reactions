import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Reaction} from '../reaction/reaction';
import {ReactionAnimateMode} from '../reaction/reaction-animate';
import {toReactionState} from '../reaction-state/reaction-state';

/**
 * A snapshot of the reaction state.
 */
export interface ReactionSnapshot {
    animate: ReactionAnimateMode | void;

    css: string[];

    disabled: boolean;

    highlight: boolean;

    icon: string;

    title: string;

    toolTip: string;

    visible: boolean;
}

/**
 * Creates an observable that emits a snapshots (state object) of a reaction.
 */
export function toReactionSnapshot(reaction: Reaction): Observable<ReactionSnapshot> {
    const state$ = toReactionState(reaction);
    return combineLatest([
        state$.icon$,
        state$.toolTip$,
        state$.title$,
        state$.animate$,
        state$.css$,
        state$.disabled$,
        state$.visible$
    ]).pipe(
        map(([icon, toolTip, title, animate, css, disabled, visible]) => ({
            icon,
            toolTip,
            title,
            animate,
            css,
            disabled,
            visible
        } as ReactionSnapshot))
    );
}
