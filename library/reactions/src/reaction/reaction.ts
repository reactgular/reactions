import {Injectable, Type} from '@angular/core';
import {ReactionProperty} from '../reaction-types';
import {ReactionEvent} from '../reaction-event/reaction-event';

/**
 * Configuration for a reaction class decorator.
 */
export interface ReactionClassDecorator extends ReactionProperties {
    /**
     * Where the class is provided.
     */
    providedIn?: Type<any> | 'root' | null;
}

/**
 * Defines object properties for a reaction.
 */
export interface ReactionProperties extends Object {
    /**
     * A map of codes to event listeners. These will be converted into hooks.
     */
    events?: { [code: string]: (event: ReactionEvent) => void };

    /**
     * A dynamic reaction value.
     */
    [name: string]: ReactionProperty<any>;
}

/**
 * Defines a reaction object. Includes definitions for meta data attached by decorators.
 */
export interface ReactionObject extends ReactionProperties {
    /**
     * The event hooks attached to the reaction. These are created by the events property or by method decorators. It
     * will exist only after the reaction is added to the core service.
     */
    __REACTION__?: ReactionEventBinding[];
}

/**
 * Configured hook that triggers a reaction event listener.
 */
export interface ReactionEventBinding {
    /**
     * Applies a throttle operator to events to reduce their emission rate.
     */
    debounce?: number;

    /**
     * The type of event (click, mousemove, shortcut)
     */
    type: string;

    /**
     * Method to be triggered
     */
    method: (event: ReactionEvent) => void;
}

/**
 * Defines a constructor function with meta data attached.
 */
export type ReactionConstructor = { new(...args: any[]): any, __REACTION__?: ReactionProperties };

/**
 * Sets the meta data on the constructor function.
 */
export const reactionMetaData = <TFunction extends ReactionConstructor>(
    clss: TFunction,
    options: ReactionClassDecorator
): TFunction => {
    options = {...options};
    delete options.providedIn;
    return (clss.__REACTION__ = options, clss);
};

/**
 * Calls the injectable decorator from Angular.
 */
export const reactionInjectable = <TFunction extends ReactionConstructor>(
    clss: TFunction,
    options: ReactionClassDecorator
): TFunction => options.hasOwnProperty('providedIn')
    ? Injectable({providedIn: options.providedIn})(clss) as TFunction
    : Injectable()(clss) as TFunction;

/**
 * Reaction decorator for classes.
 */
export function Reaction<TFunction extends ReactionConstructor>(options: ReactionClassDecorator): (TFunction) => TFunction {
    return (func: TFunction): TFunction => reactionInjectable(reactionMetaData(func, options), options);
}
