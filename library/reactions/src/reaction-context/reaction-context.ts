import {ElementRef, ViewContainerRef} from '@angular/core';

export interface ReactionContext {
    readonly type: 'mouse' | 'key';
    readonly when: 'down' | 'up';
}

export interface ReactionMouse extends ReactionContext {
    readonly el: ElementRef<HTMLElement>;
    readonly event: MouseEvent;
    readonly view: ViewContainerRef;
}

export interface ReactionKeyboard extends ReactionContext {
    readonly event: KeyboardEvent;
}

export function isReactionContextMouse(value: ReactionContext): value is ReactionMouse {
    return value.type === 'mouse';
}

export function isReactionContextKeyboard(value: ReactionContext): value is ReactionKeyboard {
    return value.type === 'key';
}
