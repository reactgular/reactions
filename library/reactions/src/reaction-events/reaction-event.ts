import {ElementRef, ViewContainerRef} from '@angular/core';
import {ReactionObject} from '../reaction/reaction';

/**
 * Base interface for all reaction events.
 */
export interface ReactionEvent {
    /**
     * A data object provided by the UI component that contains the reaction control.
     */
    data?: any;

    /**
     * The element for ReactionModel if emitted from a DOM event.
     */
    el?: ElementRef<HTMLElement>;

    /**
     * Unique ID for debugging
     */
    id: number;

    /**
     * The original event that triggered this event.
     */
    payload: any;

    /**
     * The reaction associated with the event.
     */
    reaction: ReactionObject;

    /**
     * The view for ReactionModel if emitted from a DOM event.
     */
    view?: ViewContainerRef;
}
