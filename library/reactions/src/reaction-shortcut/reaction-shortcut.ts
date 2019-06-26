import {ReactionEvent} from '../reaction-event/reaction-event';
import {ReactionEventBinding, ReactionObject} from '../reaction/reaction';

export const REACTION_SHORTCUT = 'shortcut';

/**
 * Compiled shortcut code.
 */
export interface ReactionShortcutCode {
    /**
     * Alt key required
     */
    altKey: boolean;

    /**
     * Ctrl key required
     */
    ctrlKey: boolean;

    /**
     * Keyboard key required
     */
    key: string;

    /**
     * Shift key required
     */
    shiftKey: boolean;
}

export interface ReactionShortcutOptions {
    /**
     * The code for the binding (i.e. CTRL+M).
     * Keys that require a shift must also bind the SHIFT key (i.e. SHIFT+?)
     */
    code: ReactionShortcutCode;

    /**
     * Hides this hot key from the keyboards short cut dialog. This might be
     * done where another hot key provides a description for two keys.
     */
    hidden?: boolean;

    /**
     * Displays an alternate hot key code for the keyboards dialog.
     */
    humanCode?: string;

    /**
     * The description for the user. Not used if hidden is true.
     */
    message?: string;

    /**
     * The section this hot key will be grouped in the keyboards dialog.
     */
    section?: string;
}

export function ReactionShortcut(options: ReactionShortcutOptions);
export function ReactionShortcut(code: string, message: string, options?: ReactionShortcutOptions);

/**
 * Decorates a method of a reaction class as a consumer of a keyboard short cut.
 *
 * @deprecated will be combined with ReactionHook
 */
export function ReactionShortcut(...args: any[]) {
    return function (target: ReactionObject, name: string, descriptor: TypedPropertyDescriptor<(event: ReactionEvent) => void>) {
        const method = descriptor.value;
        const eventType = REACTION_SHORTCUT;

        if (args.length === 1) {
            const options = args[0];
            target.hook({...options, eventType, method, code: compileShortcutCode(options.code)});
        } else if (args.length === 2 || args.length === 3) {
            const code = args[0];
            const message = args[1];
            const options = args[2] || {};
            target.hook({...options, message, eventType, method, code: compileShortcutCode(code)});
        }
    };
}

function compileShortcutCode(value: string): ReactionShortcutCode {
    const parts = value.trim().toUpperCase().replace(/\s/g, '').split('+');
    const code = {
        altKey: false,
        ctrlKey: false,
        key: parts[parts.length - 1].toLowerCase(),
        shiftKey: false
    } as ReactionShortcutCode;
    if (code.key === 'shift') {
        code.shiftKey = true;
    }
    const remap = {
        del: 'delete',
        esc: 'escape',
        back: 'backspace'
    };
    if (remap[code.key]) {
        code.key = remap[code.key];
    }
    parts.pop();
    parts.forEach(part => {
        switch (part) {
            case 'CTRL':
                code.ctrlKey = true;
                break;
            case 'ALT':
                code.altKey = true;
                break;
            case 'SHIFT':
                code.shiftKey = true;
                break;
            default:
                throw new Error(`Invalid special key: ${part}`);
        }
    });
    return code;
}
