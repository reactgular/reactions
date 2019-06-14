import {ElementRef, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';

export interface ReactionModel {
    /**
     * The DOM element associated with the model directive.
     */
    el: ElementRef<HTMLElement>;

    /**
     * The view associated with the model directive.
     */
    view: ViewContainerRef;

    /**
     * Emits data provided to the model.
     */
    data$: Observable<any>;
}
