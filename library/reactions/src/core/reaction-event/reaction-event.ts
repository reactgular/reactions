import {ElementRef, ViewContainerRef} from '@angular/core';
import {hydrateReaction} from '../../utils/hydrate-reaction';
import {ReactionObject} from '../reaction-types';

/**
 * Base interface for all reaction events.
 */
export class ReactionEvent {
    /**
     * The element for ReactionModel if emitted from a DOM event.
     */
    public readonly el?: ElementRef<HTMLElement>;

    /**
     * Unique ID for debugging
     */
    public readonly id: number;

    /**
     * The reaction associated with the event.
     */
    public readonly reaction: ReactionObject;

    /**
     * The view for ReactionModel if emitted from a DOM event.
     */
    public readonly view?: ViewContainerRef;

    /**
     * The original event that triggered this event.
     */
    private readonly _event: Event;

    /**
     * Constructor
     */
    public constructor(id: number,
                       reaction: ReactionObject,
                       event: Event,
                       el?: ElementRef<HTMLElement>,
                       view?: ViewContainerRef) {
        this.id = id;
        this.reaction = hydrateReaction(reaction);
        this._event = event;
        this.el = el;
        this.view = view;
    }

    /**
     * The original event that triggered this event.
     */
    public event<TType extends Event>(): TType {
        return this._event as TType;
    }
}
