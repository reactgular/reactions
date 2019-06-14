import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, OnDestroy} from '@angular/core';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {defaultIfEmpty, filter, first, map, scan, switchMap, takeUntil, tap, throttleTime, withLatestFrom} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionModel} from '../reaction-model/reaction-model';
import {isReactionShortcutOptions, ReactionShortcutOptions} from '../reaction-shortcut/reaction-shortcut';
import {isReactionDisabled} from '../reaction-types/reaction-disabled';
import {toObservable} from '../reaction-utils/observables';
import {Reaction} from '../reaction/reaction';
import {ReactionCore} from './reaction-core';

/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 */
@Injectable({providedIn: 'root'})
export class ReactionCoreService implements ReactionCore, OnDestroy {
    /**
     * All of the reaction events.
     */
    public readonly events$: Observable<ReactionEvent>;

    /**
     * Destruction event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * @todo this should be an observable
     */
    private _disabledCount: number = 0;

    /**
     * Emitter of the events.
     */
    private readonly _events$: Subject<ReactionEvent>;

    /**
     * Constructor
     */
    public constructor(@Inject(DOCUMENT) private _doc: Document) {
        this._events$ = new Subject<ReactionEvent>();
        this.events$ = this._events$.pipe(scan((acc, next) => ({...next, id: acc.id + 1}), {id: 0} as ReactionEvent));
    }

    /**
     * Bootstraps a reaction when it's being created.
     */
    public bootstrap(reaction: Reaction) {
        const disabled$ = toObservable(isReactionDisabled(reaction) ? reaction.disabled() : false);
        const hooks = reaction.hocks.filter(hook => isReactionShortcutOptions(hook)) as ReactionShortcutOptions[];

        const events$ = hooks.map(hook => {
            return fromEvent<KeyboardEvent>(this._doc, 'keydown').pipe(
                // only key presses for this hook
                filter(event => event.key.toLowerCase() === hook.code.key
                    && event.ctrlKey === hook.code.ctrlKey
                    && event.altKey === hook.code.altKey
                    && event.shiftKey === hook.code.shiftKey
                    && !event.repeat)
            );
        });

        merge<KeyboardEvent>(...events$).pipe(
            // disable default even if the hook is disabled (i.e. CTRL+S shouldn't save the web page)
            tap(event => event.preventDefault()),
            withLatestFrom(disabled$),
            filter(([event, disabled]) => !disabled && this._disabledCount === 0),
            map(([event, disabled]) => event),
            map<KeyboardEvent, ReactionEvent>(payload => ({id: 0, payload, reaction})),
            takeUntil(merge(this._destroyed$, reaction.destroyed$))
        ).subscribe(event => this._events$.next(event));
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * Publishes events from the model for the reaction.
     */
    public publish({el, view, data$}: ReactionModel, reaction: Reaction, destroyed$: Observable<void>) {
        const events$ = reaction.hocks.map(hook => {
            const event$ = fromEvent<UIEvent>(el.nativeElement, hook.eventType);
            return hook.debounce
                ? event$.pipe(throttleTime(hook.debounce))
                : event$;
        });

        merge<UIEvent>(...events$).pipe(
            tap(event => event.preventDefault()),
            map<UIEvent, ReactionEvent>(payload => ({id: 0, el, view, payload, reaction})),
            switchMap(event => data$.pipe(
                defaultIfEmpty(undefined),
                first(),
                map(data => ({...event, data}))
            )),
            takeUntil(merge(this._destroyed$, destroyed$))
        ).subscribe(event => this._events$.next(event));
    }
}
