import {OnDestroy} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {ReactionCore} from '../reaction-core/reaction-core';
import {isEventForReaction, ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionHookOptions} from '../reaction-hook/reaction-hook';
import {ReactionTitle} from '../reaction-types/reaction-title';
import {ReactionTooltip} from '../reaction-types/reaction-tooltip';

/**
 * Base class for reaction objects.
 */
export abstract class Reaction implements OnDestroy, ReactionTitle, ReactionTooltip {
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

        this._core.events$.pipe(
            filter(event => isEventForReaction(this, event)),
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
