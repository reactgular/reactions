import {Observable} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {toReactionValue} from '../../utils/reaction-value';
import {ReactionObject} from './reaction-types';

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
    icon: ReactionProperty<any>;

    /**
     * Secondary icon shown after the text.
     */
    secondary?: ReactionProperty<any>;

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
    icon: Observable<any>;

    /**
     * Secondary state
     */
    secondary: Observable<any>;

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
    icon: any;

    /**
     * Secondary state
     */
    secondary: any;

    /**
     * Animation state
     */
    secondaryAnimate: ReactionIconAnimate;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionIconReducer(acc: ReactionObject, next: ReactionObject | ReactionIcon): ReactionObject {
    const icon = toReactionValue(next.icon);
    const animate = toReactionValue(next.animate);
    const secondary = toReactionValue(next.secondary);
    const secondaryAnimate = toReactionValue(next.secondaryAnimate);
    return {...acc, icon, animate, secondary, secondaryAnimate};
}
