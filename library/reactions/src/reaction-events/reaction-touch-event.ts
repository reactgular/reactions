import {ReactionEvent} from './reaction-event';

/**
 * Defines the interface for touch events.
 */
export interface ReactionTouchEvent extends ReactionEvent {
    /**
     * The touch event from the DOM.
     */
    event: TouchEvent;
    /**
     * Type of event.
     */
    type: 'touch';
}

/**
 * Checks if an event is a touch event.
 */
export function isReactionTouchEvent(event: ReactionEvent): event is ReactionTouchEvent {
    return event.type === 'touch';
}
