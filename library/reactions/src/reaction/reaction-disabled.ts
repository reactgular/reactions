import {Observable} from 'rxjs';

export interface ReactionDisabled {
    /**
     * Emits the disabled state of a tool.
     */
    disabled(): Observable<boolean>;
}

export function isReactionDisabled(value: any): value is ReactionDisabled {
    return typeof (<ReactionDisabled>value).disabled === 'function';
}
