import {ReactionEvent} from '../reaction-events/reaction-event';
import {Reaction} from '../reaction/reaction';

/**
 * Configured hook that triggers a reaction
 */
export interface ReactionHookOptions {
    /**
     * Applies a throttle operator to events to reduce their emission rate.
     */
    debounce?: number;

    /**
     * The type of event (click, mousemove, shortcut)
     */
    eventType?: string;

    /**
     * Method to be triggered
     */
    method?: (event: ReactionEvent) => void;
}

export function ReactionHook(options: ReactionHookOptions);
export function ReactionHook(eventType: string, options?: ReactionHookOptions);

/**
 * Decorates a method of a reaction class as a consumer for a specific event.
 */
export function ReactionHook(...args: any[]) {
    return function (target: Reaction, name: string, descriptor: TypedPropertyDescriptor<(event: ReactionEvent) => void>) {
        const method = descriptor.value;
        if (args.length === 1 && typeof args[0] === 'string') {
            const eventType = args[0];
            target.hook({eventType, method});
        } else if (args.length === 1 && typeof args[0] === 'object') {
            const options = args[0];
            target.hook({...options, method});
        } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
            const eventType = args[0];
            const options = args[1];
            target.hook({...options, eventType, method});
        } else {
            console.log(args);
            throw new Error('Unexpected arguments');
        }
    };
}
