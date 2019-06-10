import {Observable} from 'rxjs';

export interface ReactionAnimate {
    /**
     * Emits the animation state of the tool. Can be "spin" or "pulse" or undefined.
     */
    animate(): Observable<string>;
}

export function isReactionAnimate(value: any): value is ReactionAnimate {
    return typeof (<ReactionAnimate>value).animate === 'function';
}
