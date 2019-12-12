import {Observable} from 'rxjs';
import {toReactionValue} from '../../utils/reaction-value';
import {ReactionObject, ReactionProperty} from '../reaction-types';

/**
 * Adds support for showing an icon.
 */
export interface ReactionIcon {
    /**
     * Primary icon shown before the text.
     */
    primary: ReactionProperty<any>;

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
     * Primary icon state
     */
    primary: Observable<any>;

    /**
     * Secondary icon state
     */
    secondary: Observable<any>;
}

/**
 * Snapshot of icon state
 */
export interface ReactionIconSnapshot {
    /**
     * Primary state
     */
    primary: any;

    /**
     * Secondary state
     */
    secondary: any;
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionIconReducer(acc: ReactionObject, next: ReactionObject | ReactionIcon): ReactionObject {
    const primary = toReactionValue(next.primary);
    const secondary = toReactionValue(next.secondary);
    return {...acc, primary, secondary};
}
