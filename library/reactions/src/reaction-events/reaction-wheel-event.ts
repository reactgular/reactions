import {ReactionEvent} from './reaction-event';

/**
 * Defines the interface for wheel events.
 */
export interface ReactionWheelEvent extends ReactionEvent {
    /**
     * The wheel event from the DOM.
     */
    event: WheelEvent;
    /**
     * Type of event.
     */
    type: 'wheel';
}

/**
 * Checks if an event is a wheel event.
 */
export function isReactionWheelEvent(event: ReactionEvent): event is ReactionWheelEvent {
    return event.type === 'wheel';
}
