import {Type} from '@angular/core';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {Reaction} from '../reaction/reaction';

export interface ReactionHookOptions<TType extends UIEvent> {
    debounce?: number;
    eventClass?: Type<TType>;
    eventType?: string;
    method?: (event: ReactionEvent<TType>) => void;
}

/**
 * Decorates a method of a reaction class as a consumer for a specific event.
 *
 * @param options Configuration options for the hook
 */
export function ReactionHook<TType extends UIEvent>(options: ReactionHookOptions<TType>);

/**
 * Decorates a method of a reaction class as a consumer for a specific event.
 *
 * @param eventClass A reference to the UIEvent constructor (MouseEvent, DragEvent, TouchEvent)
 * @param eventType The event type such as ("click", "dblclick", "mousemove")
 * @param options Configuration options for the hook
 */
export function ReactionHook<TType extends UIEvent>(eventClass: Type<TType>, eventType: string, options?: ReactionHookOptions<TType>);

/**
 * Decorates a method of a reaction class as a consumer for a specific event.
 */
export function ReactionHook<TType extends UIEvent>(...args: any[]) {
    return function (target: Reaction, name: string, descriptor: TypedPropertyDescriptor<(event: ReactionEvent<TType>) => void>) {
        const method = descriptor.value;
        if (args.length === 1) {
            // one argument means just an options object
            target.register({...args[0], method});
        } else if (args.length === 2) {
            // two arguments means eventClass and eventType only
            const eventClass = args[0];
            const eventType = args[1];
            target.register({eventClass, eventType, method});
        } else if (args.length === 3) {
            // three arguments means eventClass, eventType and options
            const eventClass = args[0];
            const eventType = args[1];
            const options = args[2];
            target.register({...options, eventClass, eventType, method});
        } else {
            throw new Error('Unexpected arguments');
        }
        // console.error({eventType, target, method, descriptor});
        // descriptor.value(undefined);
    };
}
