import {ReactionTitle} from '../reaction-types/reaction-title';

/**
 * Configuration options for a reaction.
 */
export interface ReactionConfig {
    /**
     * List of UIEvent types that are bound to the reaction.
     */
    events?: string[];
    /**
     * The order of the tool.
     */
    order: string;
}

/**
 * Gets the configuration from a reaction with applied defaults.
 */
export function reactionConfig(tool: ReactionTitle): ReactionConfig {
    const config = tool.config || {};
    const order = config.order || '0000:0000';
    return Object.assign({order}, config);
}
