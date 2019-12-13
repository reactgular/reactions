import {ReactionConstructor, ReactionObject} from '../core/reaction-types';

/**
 * Copies the properties defined by the decorator to a reaction instance.
 */
export function hydrateReaction(reaction: ReactionObject): ReactionObject {
    const func = reaction.constructor as ReactionConstructor;
    if (func && func.__REACTION__) {
        Object.keys(func.__REACTION__)
            .filter(key => !reaction.hasOwnProperty(key))
            .forEach(key => reaction[key] = func.__REACTION__[key]);
        delete func.__REACTION__;
    }
    if (!reaction.__REACTION__) {
        reaction.__REACTION__ = [];
    }
    return reaction;
}
