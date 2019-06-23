import {ReactionBase} from '../reaction-base/reaction-base';

/**
 * Configuration options for a reaction.
 *
 * @deprecated Replaced by ReactionMetaData
 */
export interface ReactionConfig {
    /**
     * The order of the tool.
     */
    order?: string;
}

/**
 * Gets the configuration from a reaction with applied defaults.
 */
export function reactionConfig(tool: ReactionBase): ReactionConfig {
    const config: ReactionConfig = tool.config || {};
    const order = config.order || '0000:0000';
    return Object.assign({order}, config);
}
