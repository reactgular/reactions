import {ElementRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {ReactionProperty} from '../reaction-types';
import {throttleTimeIf, toObservable} from '../reaction-utils/observables';
import {ReactionEvent} from '../reaction-event/reaction-event';
import {map, tap} from 'rxjs/operators';

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
    __REACTION__?: ReactionHookOptions[];
}

/**
 * Configured hook that triggers a reaction event listener.
 */
export interface ReactionHookOptions {
    /**
     * Applies a throttle operator to events to reduce their emission rate.
     */
    debounce?: number;

    /**
     * The type of event (click, mousemove, shortcut)
     */
    eventType?: string;

    /**
     * Method to be triggered
     */
    method?: (event: ReactionEvent) => void;
}

/**
 * Defines a constructor function with meta data attached.
 */
export type ReactionConstructor = { new(...args: any[]): any, __REACTION__?: ReactionProperties };

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

/**
 * Copies the properties defined by the decorator to a reaction instance.
 */
export function hydrateInstance(reaction: ReactionObject): ReactionObject {
    const func = reaction.constructor as ReactionConstructor;
    if (func && func.__REACTION__) {
        Object.keys(func.__REACTION__)
            .filter(key => !reaction.hasOwnProperty(key))
            .reduce((acc, key) => (acc[key] = func.__REACTION__[key], acc), reaction);
    }
    if (!reaction.__REACTION__) {
        reaction.__REACTION__ = [];
    }
    return reaction;
}

export function fromElement(el: ElementRef<HTMLElement>, view: ViewContainerRef, reaction: ReactionObject): Observable<ReactionEvent> {
    const hooks = hydrateInstance(reaction).__REACTION__;

    const events$ = hooks.map(({eventType, debounce}) => fromEvent<UIEvent>(el.nativeElement, eventType)
        .pipe(throttleTimeIf(Boolean(debounce), debounce)));

    return merge<UIEvent>(...events$).pipe(
        tap(event => event.preventDefault()),
        map<UIEvent, ReactionEvent>(payload => ({id: 0, el, view, payload, reaction})),
    );
}
