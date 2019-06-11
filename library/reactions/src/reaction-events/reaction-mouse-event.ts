import {ReactionEvent} from './reaction-event';

/**
 * Defines the interface for mouse events.
 */
export interface ReactionMouseEvent extends ReactionEvent {
    /**
     * The mouse event from the DOM.
     */
    event: MouseEvent;
    /**
     * Type of event.
     */
    type: 'mouse';
}

/**
 * Checks if an event is a mouse event.
 */
export function isReactionMouseEvent(event: ReactionEvent): event is ReactionMouseEvent {
    return event.type === 'mouse';
}
