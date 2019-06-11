import {ReactionEvent} from './reaction-event';

/**
 * Defines the interface for mouse events.
 */
export interface ReactionFocusEvent extends ReactionEvent {
    /**
     * The focus event from the DOM.
     */
    event: FocusEvent;
    /**
     * Type of event.
     */
    type: 'focus';
}

/**
 * Checks if an event is a mouse event.
 */
export function isReactionFocusEvent(event: ReactionEvent): event is ReactionFocusEvent {
    return event.type === 'focus';
}
