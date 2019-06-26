import {ReactionEvent} from '../reaction-event/reaction-event';

/**
 * Decorates a method of a reaction class as a consumer for a specific event.
 *
 * @todo This needs a better name ReactionEvent?
 */
export function ReactionHook(...args: any[]) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<(event: ReactionEvent) => void>) {
        const hooks = [];
        const method = descriptor.value;
        if (args.length === 1 && typeof args[0] === 'string') {
            const eventType = args[0];
            hooks.push({type: eventType, method});
        } else if (args.length === 1 && typeof args[0] === 'object') {
            const options = args[0];
            hooks.push({...options, method});
        } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
            const eventType = args[0];
            const options = args[1];
            hooks.push({...options, type: eventType, method});
        } else {
            throw new Error('Unexpected arguments');
        }
    };
}
