import {Injectable, Type} from '@angular/core';
import {ReactionProperty} from '../reaction-types';
import {ReactionEvent} from '../reaction-event/reaction-event';

/**
 * Configuration for a reaction class decorator.
 */
export interface ReactionClassOptions extends ReactionProperties {
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
 * Defines a class decorator function that supports a reaction constructor signature.
 */
export type ReactionClassDecorator = (ReactionConstructor) => ReactionConstructor;

/**
 * Sets the meta data on the constructor function.
 */
export const reactionMetaData = <TFunction extends ReactionConstructor>(
    clss: TFunction,
    options: ReactionClassOptions
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
    options: ReactionClassOptions
): TFunction => options.hasOwnProperty('providedIn')
    ? Injectable({providedIn: options.providedIn})(clss) as TFunction
    : Injectable()(clss) as TFunction;

/**
 * Reaction decorator for classes.
 */
export function Reaction(options: ReactionClassOptions): ReactionClassDecorator;

/**
 * Reaction decorator for methods.
 */
export function Reaction(type: string, debounce?: number): MethodDecorator;

/**
 * Applies the required decorator based upon the argument types.
 */
export function Reaction(...args: any[]): ReactionClassDecorator | MethodDecorator {
    if (args.length === 1 && typeof args[0] === 'object') {
        return reactionClass(args[0]);
    } else if (args.length >= 1 && args.length <= 2 && typeof args[0] === 'string') {
        return reactionMethod(args[0], args.length === 2 ? args[1] : 0);
    }
}

/**
 * The class decorator function.
 */
export function reactionClass(options: ReactionClassOptions): ReactionClassDecorator {
    return <ReactionConstructor>(func) => reactionInjectable(reactionMetaData(func, options), options);
}

/**
 * The method decorator function.
 */
export function reactionMethod(type: string, debounce: number): MethodDecorator {
    return (target: ReactionObject, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (!target.__REACTION__) {
            target.__REACTION__ = [];
        }
        if (typeof target[methodName] === 'function') {
            target.__REACTION__.push({type, debounce, method: target[methodName]});
        }
        return descriptor;
    }
}
