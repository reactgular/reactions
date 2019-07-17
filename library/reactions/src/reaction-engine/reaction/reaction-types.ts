/**
 * Defines a class decorator function that supports a reaction constructor signature.
 */
/**
 * Defines a constructor function with meta data attached.
 */
import {Type} from '@angular/core';
import {ReactionCodeModifiers} from '../reaction-code-parser/reaction-code-types';
import {ReactionEventHandler, ReactionProperty} from '../reaction-types';
import {ReactionEvent} from '../reaction-event/reaction-event';
import {ReactionState} from '../reaction-state/reaction-state';
import {Observable} from 'rxjs';
import {ReactionSnapshot} from '../reaction-snapshot/reaction-snapshot';

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

    /**
     * Cache of the observable version of this reaction object.
     */
    __STATE__?: ReactionState;

    /**
     * Cache of the observable snapshot of this reaction object.
     */
    __SNAPSHOT__?: Observable<ReactionSnapshot>;
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

export type ReactionConstructor = { new(...args: any[]): any, __REACTION__?: ReactionProperties };
export type ReactionClassDecorator = (ReactionConstructor) => ReactionConstructor;
