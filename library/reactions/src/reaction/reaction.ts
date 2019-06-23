import {Injectable, Type} from '@angular/core';
import {Observable, of} from 'rxjs';
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

export type ReactionValue<TType> = TType | Observable<TType>;
export type ReactionCallback<TType> = (data?: any) => ReactionValue<TType>;
export type ReactionProperty<TType> = ReactionValue<TType> | ReactionCallback<TType>;

export function toReactionValue<TType>(value: any, data: any, _default: TType = undefined): Observable<TType> {
    if (value === undefined) {
        return of(_default);
    }
    if (typeof value === 'function') {
        return toReactionValue(value(data), data, _default);
    }
    return toObservable(value);
}

export const REACTION_KEY = '__reaction__';

/**
 * Sets the meta data on the constructor function.
 */
const metaData = (clss: Function, options: ReactionObject & ReactionObject) => (clss[REACTION_KEY] = options, clss);

/**
 * Calls the injectable decorator from Angular.
 */
const injectable = (clss: Function, options: ReactionObject & ReactionObject) => options.hasOwnProperty('providedIn')
    ? Injectable({providedIn: options.providedIn})(clss)
    : Injectable()(clss);

/**
 * Reaction decorator for classes.
 */
export function Reaction(options: ReactionObject & ReactionObject) {
    return (clss: Function) => injectable(metaData(clss, options), options);
}
