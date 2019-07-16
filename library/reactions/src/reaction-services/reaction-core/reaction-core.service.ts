import {DOCUMENT} from '@angular/common';
import {ElementRef, Inject, Injectable, OnDestroy, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, defaultIfEmpty, distinctUntilChanged, first, map, mapTo, takeUntil} from 'rxjs/operators';
import {ReactionEvent} from '../../reaction-engine/reaction-event/reaction-event';
import {disabledWhen} from '../../reaction-utils/observables';
import {ReactionObject} from '../../reaction-engine/reaction/reaction-types';
import {ReactionShortcutService} from '../reaction-shortcut/reaction-shortcut.service';

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
    public constructor(@Inject(DOCUMENT) private _doc: any,
                       private _shortcut: ReactionShortcutService) {
        this._events$ = new Subject<ReactionEvent>();
        this.events$ = this._events$.pipe(
            takeUntil(this._destroyed$)
        );
        this.events$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(event => {
            const hook = event.reaction.__REACTION__.find(hook => hook.type === event.type);
            if (hook) {
                hook.method.apply(event.reaction, event);
            }
        });
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
        return this._shortcut.esc$.pipe(
            disabledWhen(this._disabled$.pipe(map(Boolean))),
            mapTo(undefined),
            takeUntil(this._destroyed$)
        );
    }

    /**
     * The internal ID for emitted events.
     */
    private _nextId: number = 1;

    /**
     * The next ID for emitted events.
     */
    public get nextId(): number {
        return this._nextId;
    }

    /**
     * Bootstraps a reaction when it's being created.
     *
     * @deprecated use hydrate instead.
     */
    public bootstrap(reaction: ReactionObject) {
        // const reactionDisabled$ = toReactionValue<boolean>(reaction['disabled'], false);
        // const disabled$ = combineLatest([reactionDisabled$, this.disabled$]).pipe(
        //     map(([disabledA, disabledB]) => disabledA || disabledB)
        // );
        //
        // const hooks = reaction.hocks.filter(hook => isReactionShortcutOptions(hook)) as ReactionShortcutOptions[];
        // const events$ = hooks.map(hook => {
        //     return fromEvent<KeyboardEvent>(this._doc, 'keydown').pipe(
        //         // only key presses for this hook
        //         filter(event => event.key.toLowerCase() === hook.code.key
        //             && event.ctrlKey === hook.code.ctrlKey
        //             && event.altKey === hook.code.altKey
        //             && event.shiftKey === hook.code.shiftKey
        //             && !event.repeat)
        //     );
        // });
        //
        // merge<KeyboardEvent>(...events$).pipe(
        //     // disable default even if the hook is disabled (i.e. CTRL+S shouldn't save the web page)
        //     tap(event => event.preventDefault()),
        //     disabledWhen(disabled$),
        //     map<KeyboardEvent, ReactionEvent>(payload => ({id: 0, payload, reaction})),
        //     // @todo this won't work
        //     takeUntil(merge(this._destroyed$, reaction.destroyed$))
        // ).subscribe(event => this._events$.next(event));
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
     * Broadcasts the event to the application.
     */
    public broadcast(reaction: ReactionObject, type: string, payload: any, el?: ElementRef<HTMLElement>, view?: ViewContainerRef) {
        this._events$.next(new ReactionEvent(this._nextId++, type, reaction, payload, el, view));
    }
}
