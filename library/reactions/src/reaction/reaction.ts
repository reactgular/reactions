import {Injectable, Type} from '@angular/core';
import curry from 'ramda/es/curry';

/**
 * Meta data attached to the constructor function.
 */
export interface ReactionMetaData {
    /**
     * The order of the tool.
     */
    order: string;

    /**
     * The default description of this reaction (used to display the shortcut dialog). You can
     * also implement a reactive interface for the description.
     */
    description?: string;

    /**
     * Where the class is provided.
     */
    providedIn?: Type<any> | 'root' | null;
}

export const REACTION_KEY = '__reaction__';

/**
 * Sets the meta data on the constructor function.
 */
const metaData = curry((clss: Function, options: ReactionMetaData) => (clss[REACTION_KEY] = options, clss));

/**
 * Calls the injectable decorator from Angular.
 */
const injectable = curry((clss: Function, options: ReactionMetaData) => options.hasOwnProperty('providedIn')
    ? Injectable({providedIn: options.providedIn})(clss)
    : Injectable()(clss));

/**
 * Reaction decorator for classes.
 */
export function Reaction(options: ReactionMetaData) {
    return (clss: Function) => injectable(metaData(clss, options), options);
}
