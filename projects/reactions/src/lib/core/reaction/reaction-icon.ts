import {Observable} from 'rxjs';
import {toReactionValue} from '../../utils/reaction-value';
import {ReactionObject, ReactionProperty} from '../reaction-types';

/**
 * Adds support for showing an icon.
 */
export interface ReactionIcon {
    /**
     * The visual icon for the tool.
     */
    icon: ReactionProperty<any>;

    /**
     * Secondary icon shown after the text.
     */
    secondary?: ReactionProperty<any>;
}

/**
 * State object for ReactionIcon
 */
export interface ReactionIconState {
    /**
     * Icon state
     */
    icon: Observable<any>;

    /**
     * Secondary state
     */
    secondary: Observable<any>;
}

/**
 * Snapshot of icon state
 */
export interface ReactionIconSnapshot {
    /**
     * Icon state
     */
    icon: any;

    /**
     * Secondary state
     */
    secondary: any;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionIconReducer(acc: ReactionObject, next: ReactionObject | ReactionIcon): ReactionObject {
    const icon = toReactionValue(next.icon);
    const secondary = toReactionValue(next.secondary);
    return {...acc, icon, secondary};
}
