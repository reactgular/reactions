/**
 * Rewrites reaction code values.
 */
export function reactionCodeRewrite(value: string): string {
    // a map would be faster, but won't show as untested in coverage report when a key is added.
    if (value === 'delete') {
        return 'del';
    } else if (value === 'escape') {
        return 'esc';
    } else if (value === 'back') {
        return 'backspace';
    } else if (value === 'cmd' || value === 'command') {
        return 'meta'
    } else if (value === 'doubleclick') {
        return 'dblclick';
    } else if (value === 'control') {
        return 'ctrl';
    }
    return value;
}
