import {DOCUMENT} from '@angular/common';
import {ElementRef, Inject, Injectable, ViewContainerRef} from '@angular/core';
import {Destroyable} from '@reactgular/destroyable';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, defaultIfEmpty, distinctUntilChanged, first, map, takeUntil} from 'rxjs/operators';
import {ReactionEvent} from '../../core/reaction-event/reaction-event';
import {reactionEventMatcher} from '../../core/reaction-event/reaction-event-matcher';
import {ReactionObject, ReactionSourceType} from '../../core/reaction-types';
import {ReactionShortcutService} from '../reaction-shortcut/reaction-shortcut.service';

/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 */
@Injectable({providedIn: 'root'})
export class ReactionCoreService extends Destroyable {
    /**
     * Emits if reactions are disabled.
     */
    public readonly disabled$: Observable<boolean>;

    /**
     * All of the reaction events.
     */
    public readonly events$: Observable<ReactionEvent>;

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
        super();
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
     * Broadcasts the event to the application.
     */
    public broadcast(reaction: ReactionObject,
                     event: Event,
                     source: ReactionSourceType,
                     el: ElementRef<HTMLElement>,
                     view: ViewContainerRef) {
        this._events$.next(new ReactionEvent(this._nextId++, reaction, event, source, el, view));
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
}
