import {ElementRef, ViewContainerRef} from '@angular/core';

export interface ReactionModel {
    /**
     * The DOM element associated with the model directive.
     */
    el: ElementRef<HTMLElement>;

    /**
     * The view associated with the model directive.
     */
    view: ViewContainerRef;
}
