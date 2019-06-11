import {ReactionEvent} from './reaction-event';

/**
 * Defines the interface for selectDrag events.
 */
export interface ReactionDragEvent extends ReactionEvent {
    /**
     * The selectDrag event from the DOM.
     */
    event: DragEvent;
    /**
     * Type of event.
     */
    type: 'drag';
}

/**
 * Checks if an event is a wheel event.
 */
export function isReactionDragEvent(event: ReactionEvent): event is ReactionDragEvent {
    return event.type === 'drag';
}
