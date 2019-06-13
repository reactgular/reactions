import {Observable} from 'rxjs';
import {ReactionTitle} from './reaction-title';

/**
 * Adds support for showing an icon.
 */
export interface ReactionIcon {
    /**
     * The visual icon for the tool.
     */
    icon(): Observable<string> | string;

    /**
     * (Optional) secondary icon shown after the text.
     */
    secondary?(): Observable<string> | string;
}

/**
 * State object for ReactionIcon
 */
export interface ReactionIconState {
    /**
     * Icon state
     */
    icon$: Observable<string>;
    /**
     * Secondary state
     */
    secondary$: Observable<string>;
}

/**
 * Snapshot of icon state
 */
export interface ReactionIconSnapshot {
    /**
     * Icon state
     */
    icon: string;
    /**
     * Secondary state
     */
    secondary: string;
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
export function reactionIconReducer(acc: any, next: ReactionTitle): ReactionIconState {
    const icon$ = isReactionIcon(next) ? next.icon() : undefined;
    const secondary$ = isReactionIcon(next) && typeof next.secondary === 'function' ? next.secondary() : undefined;
    return {...acc, ...{icon$, secondary$}};
}
