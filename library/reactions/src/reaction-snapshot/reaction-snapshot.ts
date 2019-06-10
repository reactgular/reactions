import {combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Reaction} from '../reaction/reaction';
import {isReactionAnimate, ReactionAnimateMode} from '../reaction/reaction-animate';
import {isReactionDisabled} from '../reaction/reaction-disabled';
import {isReactionStyle, ReactionColor} from '../reaction/reaction-style';
import {isReactionVisible} from '../reaction/reaction-visible';

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

export function createSnapshot(reaction: Reaction): Observable<ReactionSnapshot> {
    const icon$ = reaction.icon();
    const toolTip$ = reaction.toolTip();
    const title$ = reaction.title();
    const animate$ = isReactionAnimate(reaction) ? reaction.animate() : of(undefined);
    const color$ = isReactionStyle(reaction) ? reaction.color() : of(undefined);
    const highlight$ = isReactionStyle(reaction) ? reaction.highlight() : of(undefined);
    const disabled$ = isReactionDisabled(reaction) ? reaction.disabled() : of(false);
    const visible$ = isReactionVisible(reaction) ? reaction.visible() : of(true);

    return combineLatest([icon$, toolTip$, title$, animate$, color$, highlight$, disabled$, visible$]).pipe(
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
