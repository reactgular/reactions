import {Injectable, Type} from '@angular/core';
import {Observable, of} from 'rxjs';
import {REACTION_KEY, ReactionProperty} from '../reaction-types';
import {toObservable} from '../reaction-utils/observables';

export interface ReactionObject {
    /**
     * Where the class is provided.
     */
    providedIn?: Type<any> | 'root' | null;

    /**
     * A dynamic reaction value.
     */
    [name: string]: ReactionProperty<any>;
}

/**
 * Converts the value to an observable. If the value is a function it is called recursively until a literal or observable
 * is returned.
 */
export function toReactionValue<TType>(value: any, _default: TType = undefined): Observable<TType> {
    if (value === undefined) {
        return of(_default);
    }
    if (typeof value === 'function') {
        return toReactionValue(value(), _default);
    }
    return toObservable(value);
}

/**
 * Sets the meta data on the constructor function.
 */
export const reactionMetaData = (clss: Function, options: ReactionObject): Function => (clss[REACTION_KEY] = options, clss);

/**
 * Calls the injectable decorator from Angular.
 */
export const reactionInjectable = (clss: Function, options: ReactionObject): Function => options.hasOwnProperty('providedIn')
    ? Injectable({providedIn: options.providedIn})(clss) as any
    : Injectable()(clss) as any;

/**
 * Reaction decorator for classes.
 */
export function Reaction(options: ReactionObject): (clss: Function) => Function {
    return (clss: Function) => reactionInjectable(reactionMetaData(clss, options), options);
}
