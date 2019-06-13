import {Injector, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {ReactionCoreService} from '../reaction-core/reaction-core.service';
import {ReactionSelectReaction} from '../reaction-selectors/reaction-select-reaction';
import {ReactionTitle} from '../reaction-types/reaction-title';
import {ReactionTooltip} from '../reaction-types/reaction-tooltip';

/**
 * Base class for reaction objects.
 */
export abstract class Reaction implements OnDestroy, ReactionTitle, ReactionTooltip {
    /**
     * The configuration
     */
    public readonly config: Partial<ReactionConfig>;

    /**
     * Destructor event
     */
    protected _destroyed$: Subject<void> = new Subject();

    /**
     * The reaction service
     */
    protected readonly _reactionCore: ReactionCoreService;

    /**
     * Selector for querying events
     */
    protected readonly _select: ReactionSelectReaction;

    /**
     * Constructor
     */
    protected constructor(injector: Injector) {
        this._reactionCore = injector.get(ReactionCoreService);
        this._select = this._reactionCore.select(this, this._destroyed$);
        this._initialize(this._select);
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * All reactions must have a title.
     */
    public abstract title(): Observable<string> | string;

    /**
     * Defaults to the title if not provided above.
     */
    public tooltip(): Observable<string> | string {
        return this.title();
    }

    /**
     * Initialization handler
     */
    protected abstract _initialize(select: ReactionSelectReaction);
}
