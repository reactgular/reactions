import {ElementRef, ViewContainerRef} from '@angular/core';
import {ReactionObject} from '../reaction/reaction';
import {hydrateReaction} from '../reaction-utils/hydrate-reaction';

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
     * The type of event is used to match this object to a method listener on the reaction object.
     */
    public readonly type: string;

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
    private readonly _payload?: any;

    /**
     * Constructor
     */
    public constructor(id: number,
                       type: string,
                       reaction: ReactionObject,
                       payload: any,
                       el?: ElementRef<HTMLElement>,
                       view?: ViewContainerRef) {
        this.id = id;
        this.type = type;
        this.reaction = hydrateReaction(reaction);
        this._payload = payload;
        this.el = el;
        this.view = view;
    }

    /**
     * The original event that triggered this event.
     */
    public payload<TType>(): TType {
        return this._payload as TType;
    }
}
