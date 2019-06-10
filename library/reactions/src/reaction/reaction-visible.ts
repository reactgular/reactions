import {Observable} from 'rxjs';

export interface ReactionVisible {
    /**
     * Emits if the tool should be shown.
     */
    visible(): Observable<boolean>;
}

export function isReactionVisible(value: any): value is ReactionVisible {
    return typeof (<ReactionVisible>value).visible === 'function';
}
