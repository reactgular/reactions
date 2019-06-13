import {Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {ReactionCoreService} from '../reaction-core/reaction-core.service';

/**
 *
 */
export abstract class Reaction {
    /**
     * Configuration options for the tool.
     */
    readonly config?: Partial<ReactionConfig>;

    protected _reactionCore: ReactionCoreService;

    /**
     * Constructor
     */
    protected constructor(injector: Injector) {
        this._reactionCore = injector.get(ReactionCoreService);
    }

    /**
     * The title shown in the body of a button or menu item.
     */
    public abstract title(): Observable<string> | string;
}

/**
 * State object for Reaction
 */
export interface ReactionState {
    /**
     * Title state
     */
    title$: Observable<string>;
}

/**
 * Snapshot of reaction.
 */
export interface ReactionSnapshot {
    /**
     * Title state
     */
    title: string;
}

/**
 * Checks if an object is a reaction
 */
export function isReaction(value: any): value is Reaction {
    return typeof (<Reaction>value).title === 'function';
}

/**
 * Updates a state object with more observable properties from the reaction.
 */
export function reactionReducer(acc: any, next: Reaction): ReactionState {
    const title$ = next.title();
    return {...acc, ...{title$}};
}
