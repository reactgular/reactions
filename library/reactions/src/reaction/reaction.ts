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
    icon(): Observable<string> | string;

    /**
     * The title shown in the body of a button or menu item.
     */
    title(): Observable<string> | string;

    /**
     * The tooltip shown when mouse hovering.
     */
    toolTip(): Observable<string> | string;
}

/**
 * State object for Reaction
 */
export interface ReactionState {
    /**
     * Icon state
     */
    icon$: Observable<string>;

    /**
     * Title state
     */
    title$: Observable<string>;

    /**
     * ToolTip state
     */
    toolTip$: Observable<string>;
}

/**
 * Checks if an object is a reaction
 */
export function isReaction(value: any): value is Reaction {
    return typeof (<Reaction>value).icon === 'function'
        && typeof (<Reaction>value).title === 'function'
        && typeof (<Reaction>value).toolTip === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionReducer(acc: any, next: Reaction): ReactionState {
    const icon$ = next.icon();
    const title$ = next.title();
    const toolTip$ = next.toolTip();
    return {...acc, ...{icon$, title$, toolTip$}};
}
