import {Injectable} from '@angular/core';
import {reactionCodeParser} from '../reaction-code-parser/reaction-code-parser';
import {ReactionClassDecorator, ReactionClassOptions, ReactionConstructor, ReactionMethodOptions, ReactionObject} from '../reaction-types';

/**
 * Reaction decorator for classes.
 */
export function Reaction(options: ReactionClassOptions): ReactionClassDecorator;

/**
 * Reaction decorator for methods.
 */
export function Reaction(type: string, options?: ReactionMethodOptions): MethodDecorator;

/**
 * Applies the required decorator based upon the argument types.
 */
export function Reaction(...args: any[]): ReactionClassDecorator | MethodDecorator {
    if (args.length === 1 && typeof args[0] === 'object') {
        return reactionClass(args[0]);
    } else if (args.length >= 1 && args.length <= 2 && typeof args[0] === 'string') {
        return reactionMethod(args[0], args.length === 2 ? args[1] : {});
    } else {
        throw new Error('Invalid arguments for Reaction decorator');
    }
}

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
 * The class decorator function.
 */
export function reactionClass(options: ReactionClassOptions): ReactionClassDecorator {
    return <ReactionConstructor>(func) => reactionInjectable(reactionMetaData(func, options), options);
}

/**
 * The method decorator function.
 */
export function reactionMethod(type: string, options: ReactionMethodOptions): MethodDecorator {
    return (target: ReactionObject, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (!target.__REACTION__) {
            target.__REACTION__ = [];
        }
        if (typeof target[methodName] === 'function') {
            reactionCodeParser(type).forEach(code => {
                target.__REACTION__.push({
                    ...options,
                    source: code.source,
                    event: code.event,
                    method: target[methodName]
                });
            });
        }
        return descriptor;
    }
}
