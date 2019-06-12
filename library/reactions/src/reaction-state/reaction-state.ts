import {Reaction} from '../reaction/reaction';
import {isReactionAnimate, ReactionAnimateMode} from '../reaction/reaction-animate';
import {Observable, of} from 'rxjs';
import {isReactionStyle} from '../reaction/reaction-style';
import {isReactionDisabled} from '../reaction/reaction-disabled';
import {isReactionVisible} from '../reaction/reaction-visible';
import {defaultIfEmpty, distinctUntilChanged, map} from 'rxjs/operators';

export interface ReactionState {
    animate$: Observable<ReactionAnimateMode | void>;

    css$: Observable<string[]>;

    disabled$: Observable<boolean>;

    icon$: Observable<string>;

    title$: Observable<string>;

    toolTip$: Observable<string>;

    visible$: Observable<boolean>;
}

export function toReactionState(reaction: Reaction): ReactionState {
    const state$: ReactionState = {
        icon$: reaction.icon(),
        toolTip$: reaction.toolTip(),
        title$: reaction.title(),
        animate$: isReactionAnimate(reaction) ? reaction.animate() : of(),
        css$: isReactionStyle(reaction) ? reaction.css() : of(),
        disabled$: isReactionDisabled(reaction) ? reaction.disabled() : of(false),
        visible$: isReactionVisible(reaction) ? reaction.visible() : of(true)
    } as ReactionState;

    state$.css$ = state$.css$.pipe(
        map((value: string | string[] | void) => {
            const values: string[] = typeof value === 'string' ? value.split(' ') : (value || []);
            return values.map(str => str.trim()).filter(Boolean);
        })
    );

    Object.keys(state$).forEach(key => {
        state$[key] = state$[key].pipe(
            defaultIfEmpty(undefined),
            distinctUntilChanged()
        );
    });

    return state$;
}
