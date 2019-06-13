import {isObservable, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReactionTitle} from './reaction-title';

/**
 * Adds support for applying CSS styles to a reaction.
 */
export interface ReactionStyle {
    /**
     * Emits CSS styles for the reaction component.
     */
    css(): Observable<string | string[] | void> | string | string[] | void;
}

/**
 * State object for ReactionStyle
 */
export interface ReactionStyleState {
    /**
     * CSS state
     */
    css$: Observable<string[]>;
}

/**
 * Snapshot of styles
 */
export interface ReactionStyleSnapshot {
    /**
     * CSS state
     */
    css: string[];
}

/**
 * Checks if the reaction supports styles.
 */
export function isReactionStyle(value: any): value is ReactionStyle {
    return typeof (<ReactionStyle>value).css === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionStyleReducer(acc: any, next: ReactionTitle): ReactionStyleState {
    let css$;
    css$ = isReactionStyle(next) ? next.css() : undefined;
    css$ = isObservable(css$) ? css$ : of(css$);
    css$ = css$.pipe(
        map((value: string | string[] | void) => {
            const values: string[] = typeof value === 'string' ? value.split(' ') : (value || []);
            return Array.from(new Set(values.map(str => str.trim()).filter(Boolean)));
        })
    );
    return {...acc, ...{css$}};
}
