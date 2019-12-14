/**
 * Creates a mouse double click event.
 */
export function createDblClickEvent(options?: MouseEventInit) {
    return createMouseEvent('dblclick', options);
}

/**
 * Creates a mouse click event.
 */
export function createClickEvent(options?: MouseEventInit) {
    return createMouseEvent('click', options);
}

/**
 * Creates a mouse event.
 */
export function createMouseEvent(type: string, options?: MouseEventInit) {
    return new MouseEvent(type, {view: window, bubbles: true, cancelable: true, ...(options || {})});
}
