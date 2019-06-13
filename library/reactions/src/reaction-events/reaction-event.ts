import {ElementRef, ViewContainerRef} from '@angular/core';
import {ReactionTitle} from '../reaction-types/reaction-title';

/**
 * Base interface for all reaction events.
 */
export interface ReactionEvent {
    /**
     * A data object provided by the UI component that contains the reaction control.
     */
    data: any;
    /**
     * The element for ReactionModel
     */
    el: ElementRef<HTMLElement>;
    /**
     * Unique ID for debugging
     */
    id: number;
    /**
     * The reaction associated with the event.
     */
    reaction: ReactionTitle;
    /**
     * The type of event (mouse, keyboard, touch, drag, etc..)
     */
    type: string;
    /**
     * The view for ReactionModel
     */
    view: ViewContainerRef;
}

/**
 * Checks if an event belongs to a reaction instance.
 */
export function isReactionEvent(reaction: ReactionTitle, event: ReactionEvent): boolean {
    return event.reaction === reaction;
}

