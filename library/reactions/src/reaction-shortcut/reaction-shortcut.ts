import {Reaction} from '../reaction/reaction';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionHookOptions} from '../reaction-hook/reaction-hook';

export interface ReactionShortcutOptions extends ReactionHookOptions {
    /**
     * The code for the binding (i.e. CTRL+M).
     * Keys that require a shift must also bind the SHIFT key (i.e. SHIFT+?)
     */
    code: string;

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
 */
export function ReactionShortcut(...args: any[]) {
    return function (target: Reaction, name: string, descriptor: TypedPropertyDescriptor<(event: ReactionEvent) => void>) {
        const method = descriptor.value;
        const eventType = 'shortcut';
        if (args.length === 1) {
            const options = args[0];
            target.hook({...options, eventType, method});
        } else if (args.length === 2 || args.length === 3) {
            const code = args[0];
            const message = args[1];
            const options = args[2] || {};
            target.hook({...options, code, message, eventType, method});
        }
    }
}
