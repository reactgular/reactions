import {Observable} from 'rxjs';

/**
 * Supported types of colors.
 */
export enum ReactionColor {
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger',
    INFO = 'info'
}

/**
 * Adds support for coloring a reaction.
 */
export interface ReactionStyle {
    /**
     * Emits the color of the tool.
     */
    color(): Observable<ReactionColor | void>;

    /**
     * Emit true/false when the reaction has the user's focus. Such as an active menu or a tool that is showing a popup.
     *
     * This feature has different effects depending on how the reactions are shown in the UI.
     */
    highlight(): Observable<boolean>;
}

/**
 * Checks if the reaction supports styles.
 */
export function isReactionStyle(value: any): value is ReactionStyle {
    return typeof (<ReactionStyle>value).color === 'function'
        && typeof (<ReactionStyle>value).highlight === 'function';
}
