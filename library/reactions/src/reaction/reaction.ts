import {Injector, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {ReactionCoreService} from '../reaction-core/reaction-core.service';
import {REACTION_DRAG_EVENTS} from '../reaction-events/reaction-drag-events';
import {isReactionEvent} from '../reaction-events/reaction-event';
import {REACTION_FOCUS_EVENTS} from '../reaction-events/reaction-focus-events';
import {REACTION_MOUSE_EVENTS} from '../reaction-events/reaction-mouse-events';
import {REACTION_TOUCH_EVENTS} from '../reaction-events/reaction-touch-events';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';
import {ReactionTitle} from '../reaction-types/reaction-title';
import {ReactionTooltip} from '../reaction-types/reaction-tooltip';

const REACTION_EVENT_WHITELIST = [
    ...REACTION_MOUSE_EVENTS,
    ...REACTION_DRAG_EVENTS,
    ...REACTION_FOCUS_EVENTS,
    ...REACTION_TOUCH_EVENTS
];

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
     * Constructor
     */
    protected constructor(config: ReactionConfig, injector: Injector) {
        this.config = this._updateConfig(config);
        this._reactionCore = injector.get(ReactionCoreService);
        this._reactionCore.events$.pipe(
            filter(event => isReactionEvent(this, event)),
            filter<ReactionUIEvent<UIEvent>>(event => isReactionUIEvent<UIEvent>(event)),
            takeUntil(this._destroyed$)
        ).subscribe(event => this._handleUIEvent(event));

        console.error(this.config);
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
     * Dispatches the event to the handler.
     */
    private _handleUIEvent(event: ReactionUIEvent<UIEvent>) {
        const type = event.event.type;
        if (typeof this[type] === 'function') {
            this[type](event);
        } else {
            throw new Error(`UIEvent [${type}] has no handler.`);
        }
    }

    /**
     * Updates the events list on the config.
     */
    private _updateConfig(config: ReactionConfig): ReactionConfig {
        const events = config.events || [];
        const handled = REACTION_EVENT_WHITELIST.filter(eventName => typeof this[eventName] === 'function');
        return {...config, events: Array.from(new Set([...events, ...handled]))};
    }
}
