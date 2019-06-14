import {Injector, OnDestroy} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {ReactionCoreService} from '../reaction-core/reaction-core.service';
import {ReactionHookOptions} from '../reaction-decorators/reaction-hook';
import {isReactionEvent, ReactionEvent} from '../reaction-events/reaction-event';
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
     * Destructor event
     */
    protected _destroyed$: Subject<void> = new Subject();

    /**
     * The reaction service
     */
    protected readonly _reactionCore: ReactionCoreService;

    /**
     * Decorated hooks for the methods
     */
    private _hooks: ReactionHookOptions<UIEvent>[];

    /**
     * Constructor
     */
    protected constructor(config: ReactionConfig, injector: Injector) {
        this.config = config;
        this._reactionCore = injector.get(ReactionCoreService);

        this._reactionCore.events$.pipe(
            filter(event => isReactionEvent(this, event)),
            map<ReactionEvent<UIEvent>, [ReactionEvent<UIEvent>, ReactionHookOptions<UIEvent>[]]>(event => {
                const hooks = this._hooks
                    .filter(hook => event.payload instanceof hook.eventClass && event.payload.type === hook.eventType);
                return [event, hooks];
            }),
            mergeMap(([event, hooks]) => from(hooks).pipe(map(hook => [event, hook]))),
            takeUntil(this._destroyed$)
        ).subscribe(([event, hook]: [ReactionEvent<UIEvent>, ReactionHookOptions<UIEvent>]) => {
            // console.error('subscribe', event, hook);
            hook.method(event);
        });

        console.error(this._hooks);
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
     *
     * @internal This is used by the decorator only.
     */
    public register(options: ReactionHookOptions<any>) {
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
     * Defaults to the title if not provided above.
     */
    public tooltip(): Observable<string> | string {
        return this.title();
    }
}
