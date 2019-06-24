import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, combineLatest, fromEvent, merge, Observable, of, Subject} from 'rxjs';
import {catchError, defaultIfEmpty, distinctUntilChanged, filter, first, map, mapTo, scan, takeUntil, tap} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-event/reaction-event';
import {ReactionKeyboardService} from '../reaction-keyboard/reaction-keyboard.service';
import {ReactionModel} from '../reaction-model/reaction-model';
import {isReactionShortcutOptions, ReactionShortcutOptions} from '../reaction-shortcut/reaction-shortcut';
import {disabledWhen} from '../reaction-utils/observables';
import {ReactionObject, toReactionValue} from '../reaction/reaction';
import {ReactionSubscribe} from '../reaction-subscribe/reaction-subscribe';

/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 */
@Injectable({providedIn: 'root'})
export class ReactionCoreService implements OnDestroy {
    /**
     * All of the reaction events.
     */
    public readonly events$: Observable<ReactionEvent>;

    /**
     * Destruction event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Disabled when above zero. Increments and decrements to support nested disabling.
     */
    private readonly _disabled$: BehaviorSubject<number> = new BehaviorSubject(0);

    /**
     * Emits if reactions are disabled.
     */
    public readonly disabled$: Observable<boolean> = this._disabled$.pipe(
        map(value => value > 0),
        distinctUntilChanged()
    );

    /**
     * Emitter of the events.
     */
    private readonly _events$: Subject<ReactionEvent>;

    /**
     * Constructor
     */
    public constructor(@Inject(DOCUMENT) private _doc: Document,
                       private _keyboard: ReactionKeyboardService) {
        this._events$ = new Subject<ReactionEvent>();
        this.events$ = this._events$.pipe(scan((acc, next) => ({...next, id: acc.id + 1}), {id: 0} as ReactionEvent));

        // this._core.events$.pipe(
        //     filter(event => this === event.reaction),
        //     filter(event => event.payload && typeof event.payload.type === 'string'),
        //     map<ReactionEvent, [ReactionEvent, ReactionHookOptions[]]>(event => {
        //         const hooks = this._hooks.filter(hook => event.payload.type === hook.eventType);
        //         return [event, hooks];
        //     }),
        //     mergeMap(([event, hooks]) => from(hooks).pipe(map(hook => [event, hook]))),
        //     takeUntil(this._destroyed$)
        // ).subscribe(([event, hook]: [ReactionEvent, ReactionHookOptions]) => {
        //     // console.error('subscribe', event, hook);
        //     hook.method(event);
        // });
    }

    /**
     * Only emits the escape key when reactions are enabled. This prevents a popup dialog which listens for ESC to close
     * from triggering behaviors elsewhere in the application on ESC.
     *
     * For example; you could select multiple items and then open a dialog to multi-edit those items. You would want the
     * ESC key to close the dialog instead of deselecting the items.
     *
     * @todo Maybe a priority setting for binding to hotkeys would be better.
     */
    public get esc$(): Observable<void> {
        return this._keyboard.esc$.pipe(
            disabledWhen(this._disabled$.pipe(map(Boolean))),
            mapTo(undefined)
        );
    }

    /**
     * Hydrates a reaction by processing all meta data. Can be called multiple times for the same reaction
     * instance.
     */
    public hydrate(reaction: ReactionObject): ReactionSubscribe {
        return new ReactionSubscribe(
            reaction,
            this._disabled$.pipe(map(Boolean)),
            this._events$
        );
    }

    /**
     * Bootstraps a reaction when it's being created.
     *
     * @deprecated use hydrate instead.
     */
    public bootstrap(reaction: ReactionObject) {
        const reactionDisabled$ = toReactionValue<boolean>(reaction['disabled'], false);
        const disabled$ = combineLatest([reactionDisabled$, this.disabled$]).pipe(
            map(([disabledA, disabledB]) => disabledA || disabledB)
        );

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
            disabledWhen(disabled$),
            map<KeyboardEvent, ReactionEvent>(payload => ({id: 0, payload, reaction})),
            // @todo this won't work
            takeUntil(merge(this._destroyed$, reaction.destroyed$))
        ).subscribe(event => this._events$.next(event));
    }

    /**
     * Disables emitting shortcut events until the observable emits.
     */
    public disableUntil(until$: Observable<void>) {
        this._disabled$.next(this._disabled$.value + 1);
        until$.pipe(
            catchError(() => of(undefined)),
            defaultIfEmpty(undefined),
            first(),
            takeUntil(this._destroyed$)
        ).subscribe(() => this._disabled$.next(this._disabled$.value - 1));
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
     *
     * @deprecated use hydrate instead.
     */
    public publish({el, view}: ReactionModel, reaction: ReactionObject, destroyed$: Observable<void>) {

        console.log({reaction});

        return;
        //
        // const events$ = reaction.hocks.map(hook => {
        //     const event$ = fromEvent<UIEvent>(el.nativeElement, hook.eventType);
        //     return hook.debounce
        //         ? event$.pipe(throttleTime(hook.debounce))
        //         : event$;
        // });
        //
        // merge<UIEvent>(...events$).pipe(
        //     tap(event => event.preventDefault()),
        //     map<UIEvent, ReactionEvent>(payload => ({id: 0, el, view, payload, reaction})),
        //     withLatestFrom(data$),
        //     map(([event, data]) => ({...event, data})),
        //     takeUntil(merge(this._destroyed$, destroyed$))
        // ).subscribe(event => this._events$.next(event));
    }
}
