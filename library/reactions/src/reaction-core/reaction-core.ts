import {ElementRef, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionSelectDrag} from '../reaction-selectors/reaction-select-drag';
import {ReactionSelectMouse} from '../reaction-selectors/reaction-select-mouse';
import {ReactionSelectReaction} from '../reaction-selectors/reaction-select-reaction';
import {ReactionSelectTouch} from '../reaction-selectors/reaction-select-touch';
import {Reaction} from '../reaction/reaction';

export interface ReactionCore {
    /**
     * Emits only drag events.
     */
    drag(): ReactionSelectDrag;

    /**
     * All of the core events.
     */
    events(): Observable<ReactionEvent>;

    /**
     * Subscribes to multiple UI events on the target, and broadcasts events for the reaction.
     */
    from(reaction: Reaction, el: ElementRef<HTMLElement>, view: ViewContainerRef, data$: Observable<any>, destroy$: Observable<void>);

    /**
     * Emits only mouse events.
     */
    mouse(): ReactionSelectMouse;

    /**
     * Selects events for a reaction.
     */
    select(reaction: Reaction): ReactionSelectReaction;

    /**
     * Emits only touch events.
     */
    touch(): ReactionSelectTouch;
}
