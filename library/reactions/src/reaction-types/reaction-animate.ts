import {Observable} from 'rxjs';
import {ReactionTitle} from './reaction-title';

/**
 * Supported types of animation.
 *
 * These are currently limited to what FontAwesome supports.
 */
export enum ReactionAnimateMode {
    SPIN = 'spin',
    PULSE = 'pulse'
}

/**
 * Adds support for animating a reaction.
 */
export interface ReactionAnimate {
    /**
     * Emits the animation state of the tool. Can be "spin" or "pulse" or undefined.
     */
    animate(): Observable<ReactionAnimateMode | void> | ReactionAnimateMode | void;
}

/**
 * Animation state
 */
export interface ReactionAnimateState {
    /**
     * Animation state
     */
    animate$: Observable<ReactionAnimateMode | void>;
}

/**
 * Snapshot of animation.
 */
export interface ReactionAnimateSnapshot {
    /**
     * Animation state
     */
    animate: ReactionAnimateMode;
}

/**
 * Checks if a reaction supports animation.
 */
export function isReactionAnimate(value: any): value is ReactionAnimate {
    return typeof (<ReactionAnimate>value).animate === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionAnimateReducer(acc: any, next: ReactionTitle): ReactionAnimateState {
    const animate$ = isReactionAnimate(next) ? next.animate() : undefined;
    return {...acc, ...{animate$}};
}
