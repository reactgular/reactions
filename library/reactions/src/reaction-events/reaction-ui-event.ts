import {ReactionEvent} from './reaction-event';

export interface ReactionUIEvent<TEventType extends UIEvent> extends ReactionEvent {
    /**
     * The UI event from the DOM.
     */
    event: TEventType;
    /**
     * Type of event.
     */
    type: 'uiEvent';

}

/**
 * Checks if an event is a mouse event.
 */
export function isReactionUIEvent<TEventType extends UIEvent>(event: ReactionEvent): event is ReactionUIEvent<TEventType> {
    return event.type === 'uiEvent';
}
