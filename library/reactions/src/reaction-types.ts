import {Observable} from 'rxjs';
import {ReactionEvent} from './reaction-event/reaction-event';

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
