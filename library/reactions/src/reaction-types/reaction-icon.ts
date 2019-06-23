import {Observable} from 'rxjs';

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
    animate?(): Observable<ReactionIconAnimate> | ReactionIconAnimate;

    /**
     * The visual icon for the tool.
     */
    icon(): Observable<string> | string;

    /**
     * Secondary icon shown after the text.
     */
    secondary?(): Observable<string> | string;

    /**
     * Emits the animation state of the tool. Can be "spin" or "pulse" or undefined.
     */
    secondaryAnimate?(): Observable<ReactionIconAnimate> | ReactionIconAnimate;
}

/**
 * State object for ReactionIcon
 */
export interface ReactionIconState {
    /**
     * Animation state
     */
    animate$: Observable<ReactionIconAnimate>;

    /**
     * Icon state
     */
    icon$: Observable<string>;

    /**
     * Secondary state
     */
    secondary$: Observable<string>;

    /**
     * Animation state
     */
    secondaryAnimate$: Observable<ReactionIconAnimate>;
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
 * Checks if an object is a reaction
 */
export function isReactionIcon(value: any): value is ReactionIcon {
    return typeof (<ReactionIcon>value).icon === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionIconReducer(acc: any, next: unknown): ReactionIconState {
    const icon$ = isReactionIcon(next) ? next.icon() : undefined;
    const animate$ = isReactionIcon(next) && next.animate ? next.animate() : undefined;
    const secondary$ = isReactionIcon(next) && next.secondary ? next.secondary() : undefined;
    const secondaryAnimate$ = isReactionIcon(next) && next.secondaryAnimate ? next.secondaryAnimate() : undefined;
    return {...acc, ...{icon$, animate$, secondary$, secondaryAnimate$}};
}
