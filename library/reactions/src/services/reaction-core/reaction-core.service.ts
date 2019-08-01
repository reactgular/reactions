import {DOCUMENT} from '@angular/common';
import {ElementRef, Inject, Injectable, OnDestroy, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, defaultIfEmpty, distinctUntilChanged, first, map, takeUntil} from 'rxjs/operators';
import {ReactionEvent} from '../../core/reaction-event/reaction-event';
import {ReactionShortcutService} from '../reaction-shortcut/reaction-shortcut.service';
import {ReactionObject} from '../../core/reaction-types';
import {reactionEventMatcher} from '../../core/reaction-event/reaction-event-matcher';

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
     * Emits if reactions are disabled.
     */
    public readonly disabled$: Observable<boolean>;

    /**
     * Destruction event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Disabled when above zero. Increments and decrements to support nested disabling.
     */
    private readonly _disabled$: BehaviorSubject<number> = new BehaviorSubject(0);

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
        ).subscribe((event: ReactionEvent) => {
            event.reaction.__REACTION__
                .filter(hook => reactionEventMatcher(event.event(), hook.event))
                .map(hook => hook.method.call(event.reaction, event));
        });
        this.disabled$ = this._disabled$.pipe(
            map(value => value > 0),
            distinctUntilChanged()
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
    public broadcast(reaction: ReactionObject, event: Event, el?: ElementRef<HTMLElement>, view?: ViewContainerRef) {
        this._events$.next(new ReactionEvent(this._nextId++, reaction, event, el, view));
    }
}
