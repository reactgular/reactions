import {Observable} from 'rxjs';

export interface ReactionStyle {
    /**
     * Emits the color of the tool.
     */
    color(): Observable<'success' | 'warning' | 'danger' | 'info' | void | void>;

    /**
     * Emits when the tool is showing a modal dialog. This might indicate that other tools are inaccessible at the moment.
     */
    highlight(): Observable<boolean>;
}

export function isReactionStyle(value: any): value is ReactionStyle {
    return typeof (<ReactionStyle>value).color === 'function'
        && typeof (<ReactionStyle>value).highlight === 'function';
}
