import {OnDestroy} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {ReactionCore} from '../reaction-core/reaction-core';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionHookOptions} from '../reaction-hook/reaction-hook';
import {ReactionTitle} from '../reaction/reaction-title';
import {ReactionTooltip} from '../reaction/reaction-tooltip';

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
 * Base class for reaction objects.
 *
 * @deprecated This will be removed, and replaced by a reactions decorators.
 */
export abstract class ReactionBase implements OnDestroy, ReactionTitle, ReactionTooltip {
    /**
     * The configuration
     */
    public readonly config: ReactionConfig;

    /**
     * Decorated hooks for the methods
     */
    private _hooks: ReactionHookOptions[];

    /**
     * Constructor
     */
    protected constructor(config: ReactionConfig,
                          protected readonly _core: ReactionCore) {
        this.config = config;

        // @todo this work should be done in the service
        this._core.events$.pipe(
            filter(event => this === event.reaction),
            filter(event => event.payload && typeof event.payload.type === 'string'),
            map<ReactionEvent, [ReactionEvent, ReactionHookOptions[]]>(event => {
                const hooks = this._hooks.filter(hook => event.payload.type === hook.eventType);
                return [event, hooks];
            }),
            mergeMap(([event, hooks]) => from(hooks).pipe(map(hook => [event, hook]))),
            takeUntil(this._destroyed$)
        ).subscribe(([event, hook]: [ReactionEvent, ReactionHookOptions]) => {
            // console.error('subscribe', event, hook);
            hook.method(event);
        });

        this._core.bootstrap(this);
    }

    /**
     * Destructor event
     */
    protected _destroyed$: Subject<void> = new Subject();

    public get destroyed$(): Observable<void> {
        return this._destroyed$.asObservable();
    }

    /**
     * Gets the hooks attached to this reaction.
     */
    public get hocks(): ReactionHookOptions[] {
        return this._hooks || [];
    }

    /**
     * Registers a event hook to this class instance.
     *
     * @todo can be done in a hidden way
     */
    public hook(options: ReactionHookOptions) {
        if (!this._hooks) {
            this._hooks = [];
        }
        this._hooks.push(options);
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
     * Defaults to the title if not overridden.
     */
    public tooltip(): Observable<string> | string {
        return this.title();
    }
}
