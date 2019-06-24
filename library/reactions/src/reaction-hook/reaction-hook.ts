import {ReactionEvent} from '../reaction-event/reaction-event';
import {ReactionHookOptions} from '../reaction/reaction';

/**
 * The property key used to attach meta data.
 *
 * @deprecated use the constructor interface instead.
 */
export const REACTION_KEY = '__reaction__';

/**
 * A reaction object that has hooks applied.
 *
 * @deprecated Use ReactionObject instead.
 */
export interface ReactionInstance {
    [REACTION_KEY]: ReactionHookOptions[];
}

/**
 * @deprecated
 */
const toReactionInstance = (obj: any): ReactionInstance => {
    if (!(obj[REACTION_KEY] instanceof Array)) {
        obj[REACTION_KEY] = [];
    }
    return obj as ReactionInstance;
};

export function ReactionHook(options: ReactionHookOptions);
export function ReactionHook(eventType: string, options?: ReactionHookOptions);

/**
 * Decorates a method of a reaction class as a consumer for a specific event.
 *
 * @todo This needs a better name ReactionEvent?
 */
export function ReactionHook(...args: any[]) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<(event: ReactionEvent) => void>) {
        const reaction: ReactionInstance = toReactionInstance(target);
        const hooks = reaction[REACTION_KEY];
        const method = descriptor.value;
        if (args.length === 1 && typeof args[0] === 'string') {
            const eventType = args[0];
            hooks.push({eventType, method});
        } else if (args.length === 1 && typeof args[0] === 'object') {
            const options = args[0];
            hooks.push({...options, method});
        } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
            const eventType = args[0];
            const options = args[1];
            hooks.push({...options, eventType, method});
        } else {
            throw new Error('Unexpected arguments');
        }
    };
}
