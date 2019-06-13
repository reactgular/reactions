import {ReactionUIEvent} from './reaction-ui-event';

/**
 * List of event types.
 */
export const REACTION_FOCUS_EVENTS = [
    'focus',
    'blur'
];

export interface ReactionFocusEvent {
    focus(event: ReactionUIEvent<FocusEvent>);
}

export interface ReactionBlurEvent {
    blur(event: ReactionUIEvent<FocusEvent>);
}
