import {Observable} from 'rxjs';
import {ReactionConfig} from '../reaction-config/reaction-config';

export interface Reaction {
    /**
     * Configuration options for the tool.
     */
    readonly config?: Partial<ReactionConfig>;

    /**
     * The visual icon for the tool.
     */
    icon(): Observable<string>;

    /**
     * The title shown in the body of a button or menu item.
     */
    title(): Observable<string>;

    /**
     * The tooltip shown when mouse hovering.
     */
    toolTip(): Observable<string>;
}

/**
 * Checks if an object is a reaction
 */
export function isReaction(value: any): value is Reaction {
    return typeof (<Reaction>value).icon === 'function'
        && typeof (<Reaction>value).title === 'function'
        && typeof (<Reaction>value).toolTip === 'function';
}
