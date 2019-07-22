/**
 * Defines a class decorator function that supports a reaction constructor signature.
 */
/**
 * Defines a constructor function with meta data attached.
 */
import {Type} from '@angular/core';
import {ReactionEventHandler, ReactionProperty} from '../reaction-types';
import {ReactionState} from '../reaction-state/reaction-state';
import {Observable} from 'rxjs';
import {ReactionSnapshot} from '../reaction-snapshot/reaction-snapshot';

/**
 * Adds reaction properties to the prototype constructor
 */
export type ReactionConstructor = { new(...args: any[]): any, __REACTION__?: ReactionProperties };

/**
 * Defines the decorator type used for classes.
 */
export type ReactionClassDecorator = (ReactionConstructor) => ReactionConstructor;

/**
 * Defines what DOM element will be used to listen for events.
 */
export type ReactionSourceType = 'element' | 'document';

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
    events?: { [code: string]: (event: ReactionEventMatcher) => void };

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
 * Matches an event by comparing all the properties.
 */
export interface ReactionEventMatcher {
    /**
     * The event type "click", "mousemove", "keyup", etc..
     */
    type: string;

    /**
     * These properties must match properties on the emitted event.
     */
    [key: string]: any;
}

/**
 * Configured hook that triggers a reaction event listener.
 */
export interface ReactionEventBinding extends ReactionMethodOptions {
    /**
     * When element to listen for events.
     */
    source: ReactionSourceType;

    /**
     * The properties of this event object must match the emitted eveng.
     */
    event: ReactionEventMatcher;

    /**
     * Method to be triggered
     */
    method: ReactionEventHandler;
}
