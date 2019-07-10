import {Injectable, Type} from '@angular/core';
import {ReactionEventHandler, ReactionProperty} from '../reaction-types';
import {ReactionEvent} from '../reaction-event/reaction-event';
import {reactionKeyModifiers} from '../reaction-code-parser/reaction-code-parser';
import {REACTION_CODE_MODIFIERS, ReactionCodeModifiers} from '../reaction-code-parser/reaction-code-types';

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
 * Configuration for a reaction method that handles events.
 */
export interface ReactionMethodOptions {
    /**
     * Applies a throttle operator to events to reduce their emission rate.
     */
    debounce?: number;

    /**
     * Hides this hot key from the keyboards short cut dialog. This might be
     * done where another hot key provides a description for two keys.
     */
    hidden?: boolean;

    /**
     * Displays an alternate hot key code for the keyboards dialog.
     *
     * @deprecated This solves the problem of SHIFT+? but won't be required in a future version.
     */
    humanCode?: string;

    /**
     * The section this hot key will be grouped in the keyboards dialog.
     */
    section?: string;
}

/**
 * Configured hook that triggers a reaction event listener.
 */
export interface ReactionEventBinding extends ReactionMethodOptions {
    /**
     * The type of event (click, mousemove, shortcut)
     */
    type: string;

    /**
     * Keyboard modifiers
     */
    modifiers?: ReactionCodeModifiers;

    /**
     * Method to be triggered
     */
    method: ReactionEventHandler;
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
            target.__REACTION__.push({
                ...options,
                type: parseType(type),
                modifiers: reactionKeyModifiers(type),
                method: target[methodName]
            });
        }
        return descriptor;
    }
}

export function parseType(type: string): string {
    return type;
}

function compileShortcutCode(type: string, method: ReactionEventHandler): ReactionEventBinding {
    const parts = type.trim().toUpperCase().replace(/\s/g, '').split('+');
    const code: ReactionEventBinding = {
        type: parts[parts.length - 1].toLowerCase(),
        modifiers: {...REACTION_CODE_MODIFIERS},
        method
    };
    if (code.type === 'shift') {
        code.modifiers.shiftKey = true;
    }
    const remap = {
        del: 'delete',
        esc: 'escape',
        back: 'backspace'
    };
    if (remap[code.type]) {
        code.type = remap[code.type];
    }
    parts.pop();
    parts.forEach(part => {
        switch (part) {
            case 'CTRL':
                code.modifiers.ctrlKey = true;
                break;
            case 'ALT':
                code.modifiers.altKey = true;
                break;
            case 'SHIFT':
                code.modifiers.shiftKey = true;
                break;
            default:
                throw new Error(`Invalid special key: ${part}`);
        }
    });
    return code;
}
