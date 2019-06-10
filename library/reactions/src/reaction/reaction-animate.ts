import {Observable} from 'rxjs';

/**
 * Supported types of animation.
 *
 * These are currently limited to what FontAwesome supports.
 */
export enum ReactionAnimateMode {
    SPIN,
    PULSE
}

/**
 * Adds support for animating a reaction.
 */
export interface ReactionAnimate {
    /**
     * Emits the animation state of the tool. Can be "spin" or "pulse" or undefined.
     */
    animate(): Observable<ReactionAnimateMode>;
}

/**
 * Checks if a reaction supports animation.
 */
export function isReactionAnimate(value: any): value is ReactionAnimate {
    return typeof (<ReactionAnimate>value).animate === 'function';
}
