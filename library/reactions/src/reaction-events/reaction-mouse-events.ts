import {ReactionUIEvent} from './reaction-ui-event';

/**
 * List of mouse event types.
 */
export const REACTION_MOUSE_EVENTS = [
    'auxclick',
    'click',
    'contextmenu',
    'dblclick',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mouseover',
    'mouseout',
    'mouseup',
    'wheel'
];

export interface ReactionAuxClickEvent {
    auxclick(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionClickEvent {
    click(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionContextMenuEvent {
    contextmenu(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionDblClickEvent {
    dblclick(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionMouseDownEvent {
    mousedown(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionMouseEnterEvent {
    mouseenter(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionMouseLeaveEvent {
    mouseleave(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionMouseOverEvent {
    mouseover(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionMouseOutEvent {
    mouseout(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionMouseUpEvent {
    mouseup(event: ReactionUIEvent<MouseEvent>);
}

export interface ReactionWheelEvent {
    wheel(event: ReactionUIEvent<MouseEvent>);
}
