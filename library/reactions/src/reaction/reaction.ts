import {OnDestroy} from '@angular/core';
import {from, Observable, Subject, Subscription} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {ReactionHookOptions} from '../reaction-hook/reaction-hook';
import {isEventForReaction, ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionTitle} from '../reaction-types/reaction-title';
import {ReactionTooltip} from '../reaction-types/reaction-tooltip';
import {ReactionCore} from '../reaction-core/reaction-core';

/**
 * Base class for reaction objects.
 */
export abstract class Reaction implements OnDestroy, ReactionTitle, ReactionTooltip {
    /**
     * The configuration
     */
    public readonly config: ReactionConfig;

    /**
     * Destructor event
     */
    protected _destroyed$: Subject<void> = new Subject();

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
    }

    /**
     * Gets the hooks attached to this reaction.
     */
    public get hocks(): ReactionHookOptions[] {
        return this._hooks || [];
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
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
