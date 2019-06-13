import {ReactionUIEvent} from './reaction-ui-event';

/**
 * List of event types.
 */
export const REACTION_TOUCH_EVENTS = [
    'touchcancel',
    'touchend',
    'touchmove',
    'touchstart'
];

export interface ReactionTouchCancelEvent {
    touchcancel(event: ReactionUIEvent<FocusEvent>);
}

export interface ReactionTouchEndEvent {
    touchend(event: ReactionUIEvent<FocusEvent>);
}

export interface ReactionTouchMoveEvent {
    touchmove(event: ReactionUIEvent<FocusEvent>);
}

export interface ReactionTouchStartEvent {
    touchstart(event: ReactionUIEvent<FocusEvent>);
}
