import {Observable} from 'rxjs';
import {ReactionEvent} from './reaction-event/reaction-event';
import {ReactionState} from './reaction-state/reaction-state';
import {ReactionSnapshot} from './reaction-snapshot/reaction-snapshot';
import {Type} from '@angular/core';

/**
 * Value can be a literal or observable.
 */
export type ReactionValue<TType> = TType | Observable<TType>;

/**
 * Value can be a function that returns a reaction value.
 */
export type ReactionCallback<TType> = () => ReactionValue<TType>;

/**
 * Type of properties on a reaction object.
 */
export type ReactionProperty<TType> = ReactionValue<TType> | ReactionCallback<TType>;

/**
 * Handler for reaction events.
 */
export type ReactionEventHandler = (event: ReactionEvent) => void;

/**
 * Keyboard states that can modify a code.
 */
export interface ReactionCodeModifiers {
    /**
     * Command key required
     */
    metaKey: boolean;

    /**
     * Alt key required
     */
    altKey: boolean;

    /**
     * Ctrl key required
     */
    ctrlKey: boolean;
}

/**
 * Default with all keys disabled.
 */
export const REACTION_CODE_MODIFIERS = Object.freeze<ReactionCodeModifiers>({
    metaKey: false,
    altKey: false,
    ctrlKey: false
});

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

/**
 * A compiled reaction code.
 */
export interface ReactionCode {
    /**
     * The source for events.
     */
    source: ReactionSourceType;

    /**
     * The matching rule for events.
     */
    event: ReactionEventMatcher;
}
