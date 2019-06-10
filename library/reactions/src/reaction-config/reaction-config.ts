import {Reaction} from '../reaction/reaction';

export interface ReactionConfig {
    /**
     * Trigger on the down context.
     */
    down: boolean;
    /**
     * The order of the tool.
     */
    order: string;
    /**
     * Trigger on the up context.
     */
    up: boolean;
}

export function reactionConfig(tool: Reaction): ReactionConfig {
    const config = tool.config || {};
    const order = config.order || '0000:0000';
    return Object.assign({
        down: true,
        up: false,
        order
    }, config);
}
