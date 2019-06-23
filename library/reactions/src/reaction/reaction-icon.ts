import {Observable} from 'rxjs';
import {ReactionObject, ReactionProperty, toReactionValue} from './reaction';

/**
 * Supported types of animation.
 *
 * These are currently limited to what FontAwesome supports.
 */
export enum ReactionIconAnimate {
    SPIN = 'spin',
    PULSE = 'pulse'
}

/**
 * Adds support for showing an icon.
 */
export interface ReactionIcon {
    /**
     * Emits the animation state of the tool. Can be "spin" or "pulse" or undefined.
     */
    animate?: ReactionProperty<ReactionIconAnimate>;

    /**
     * The visual icon for the tool.
     */
    icon: ReactionProperty<string>;

    /**
     * Secondary icon shown after the text.
     */
    secondary?: ReactionProperty<string>;

    /**
     * Emits the animation state of the tool. Can be "spin" or "pulse" or undefined.
     */
    secondaryAnimate?: ReactionProperty<ReactionIconAnimate>;
}

/**
 * State object for ReactionIcon
 */
export interface ReactionIconState {
    /**
     * Animation state
     */
    animate: Observable<ReactionIconAnimate>;

    /**
     * Icon state
     */
    icon: Observable<string>;

    /**
     * Secondary state
     */
    secondary: Observable<string>;

    /**
     * Animation state
     */
    secondaryAnimate: Observable<ReactionIconAnimate>;
}

/**
 * Snapshot of icon state
 */
export interface ReactionIconSnapshot {
    /**
     * Animation state
     */
    animate: ReactionIconAnimate;

    /**
     * Icon state
     */
    icon: string;

    /**
     * Secondary state
     */
    secondary: string;

    /**
     * Animation state
     */
    secondaryAnimate: ReactionIconAnimate;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionIconReducer(acc: ReactionObject, next: ReactionObject): ReactionObject {
    const icon = toReactionValue(next['icon']);
    const animate = toReactionValue(next['animate']);
    const secondary = toReactionValue(next['secondary']);
    const secondaryAnimate = toReactionValue(next['secondaryAnimate']);
    return {...acc, icon, animate, secondary, secondaryAnimate};
}
