import {Reaction} from '../reaction/reaction';

/**
 * Base interface for all reaction events.
 */
export interface ReactionEvent {
    /**
     * A data object provided by the UI component that contains the reaction control.
     */
    data: any;
    /**
     * Unique ID for debugging
     */
    id: number;
    /**
     * The reaction associated with the event.
     */
    reaction: Reaction;
    /**
     * The type of event (mouse, keyboard, touch, drag, etc..)
     */
    type: string;
}

/**
 * Checks if an event belongs to a reaction instance.
 */
export function isReactionEvent(reaction: Reaction, event: ReactionEvent): boolean {
    return event.reaction === reaction;
}

