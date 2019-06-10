import {ElementRef, ViewContainerRef} from '@angular/core';

/**
 * Defines a reaction context.
 */
export interface ReactionContext {
    readonly type: 'mouse' | 'key';
    readonly when: 'down' | 'up';
}

/**
 * Defines a reaction context for a mouse event.
 */
export interface ReactionMouse extends ReactionContext {
    readonly el: ElementRef<HTMLElement>;
    readonly event: MouseEvent;
    readonly view: ViewContainerRef;
}

/**
 * Checks if a context is for a mouse.
 */
export function isReactionContextMouse(value: ReactionContext): value is ReactionMouse {
    return value.type === 'mouse';
}

/**
 * Defines a reaction context for a keyboard event.
 */
export interface ReactionKeyboard extends ReactionContext {
    readonly event: KeyboardEvent;
}

/**
 * Checks if a context is for a keybaord.
 */
export function isReactionContextKeyboard(value: ReactionContext): value is ReactionKeyboard {
    return value.type === 'key';
}
