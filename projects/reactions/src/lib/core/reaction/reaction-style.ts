import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReactionObject, ReactionProperty} from '../reaction-types';
import {toReactionValue} from '../../utils/reaction-value';

/**
 * Adds support for applying CSS styles to a reaction.
 */
export interface ReactionStyle {
    /**
     * Emits CSS styles for the reaction component.
     */
    css: ReactionProperty<string | string[] | void>;
}

/**
 * State object for ReactionStyle
 */
export interface ReactionStyleState {
    /**
     * CSS state
     */
    css: Observable<string[]>;
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
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionStyleReducer(acc: ReactionObject, next: ReactionObject | ReactionStyle): ReactionObject {
    const css = toReactionValue<string | string[] | void>(next.css).pipe(
        map((value: string | string[] | void) => {
            const values: string[] = typeof value === 'string' ? value.split(' ') : (value || []);
            return Array.from(new Set(values.map(str => str.trim()).filter(Boolean)));
        })
    );
    return {...acc, css};
}
