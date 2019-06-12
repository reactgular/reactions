import {combineLatest, Observable, of} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, map} from 'rxjs/operators';
import {Reaction} from '../reaction/reaction';
import {isReactionAnimate, ReactionAnimateMode} from '../reaction/reaction-animate';
import {isReactionDisabled} from '../reaction/reaction-disabled';
import {isReactionStyle, ReactionColor} from '../reaction/reaction-style';
import {isReactionVisible} from '../reaction/reaction-visible';

export interface ReactionState {
    animate$: Observable<ReactionAnimateMode | void>;
    color$: Observable<ReactionColor | void>;
    disabled$: Observable<boolean>;
    highlight$: Observable<boolean>;
    icon$: Observable<string>;
    title$: Observable<string>;
    toolTip$: Observable<string>;
    visible$: Observable<boolean>;
}

/**
 * A snapshot of the reaction state.
 */
export interface ReactionSnapshot {
    animate: ReactionAnimateMode | void;
    color: ReactionColor | void;
    disabled: boolean;
    highlight: boolean;
    icon: string;
    title: string;
    toolTip: string;
    visible: boolean;
}

export function createState(reaction: Reaction): ReactionState {
    const state$: ReactionState = {
        icon$: reaction.icon(),
        toolTip$: reaction.toolTip(),
        title$: reaction.title(),
        animate$: isReactionAnimate(reaction) ? reaction.animate() : of(undefined),
        color$: isReactionStyle(reaction) ? reaction.color() : of(undefined),
        highlight$: isReactionStyle(reaction) ? reaction.highlight() : of(undefined),
        disabled$: isReactionDisabled(reaction) ? reaction.disabled() : of(false),
        visible$: isReactionVisible(reaction) ? reaction.visible() : of(true)
    };

    Object.keys(state$).forEach(key => {
        state$[key] = state$[key].pipe(
            defaultIfEmpty(undefined),
            distinctUntilChanged()
        );
    });

    return state$;
}

/**
 * Creates an observable that emits a snapshots (state object) of a reaction.
 */
export function createSnapshot(reaction: Reaction): Observable<ReactionSnapshot> {
    const state$ = createState(reaction);
    return combineLatest(Object.values(state$)).pipe(
        map(([icon, toolTip, title, animate, color, highlight, disabled, visible]) => ({
            icon,
            toolTip,
            title,
            animate,
            color,
            highlight,
            disabled,
            visible
        } as ReactionSnapshot))
    );
}
