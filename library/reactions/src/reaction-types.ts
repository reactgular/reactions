import {Observable} from 'rxjs';
import {ReactionObject} from './reaction/reaction';

/**
 * The property key used to attach meta data.
 */
export const REACTION_KEY = '__reaction__';

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
 * Defines a reducer function for creating a single reaction state object.
 */
export type ReactionReducer = (acc: ReactionObject, next: ReactionObject) => ReactionObject;
