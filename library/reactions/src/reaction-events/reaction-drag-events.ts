import {ReactionUIEvent} from './reaction-ui-event';

/**
 * List of event types.
 */
export const REACTION_DRAG_EVENTS = [
    'dragend',
    'dragenter',
    'dragstart',
    'dragleave',
    'dragover',
    'drop'
];

export interface ReactionDragEndEvent {
    dragend(event: ReactionUIEvent<DragEvent>);
}

export interface ReactionDragEnterEvent {
    dragenter(event: ReactionUIEvent<DragEvent>);
}

export interface ReactionDragStartEvent {
    dragstart(event: ReactionUIEvent<DragEvent>);
}

export interface ReactionDragLeaveEvent {
    dragleave(event: ReactionUIEvent<DragEvent>);
}

export interface ReactionDragOverEvent {
    dragover(event: ReactionUIEvent<DragEvent>);
}

export interface ReactionDragDropEvent {
    dragdrop(event: ReactionUIEvent<DragEvent>);
}
