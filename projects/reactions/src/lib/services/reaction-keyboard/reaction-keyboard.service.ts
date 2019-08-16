import {Inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {distinctUntilChanged, filter, map, mapTo, takeUntil} from 'rxjs/operators';

interface KeyboardState {
    ctrlKey: boolean;

    altKey: boolean;

    metaKey: boolean;

    shiftKey: boolean;
}

/**
 * A service for consuming events from the keyboard.
 */
@Injectable({providedIn: 'root'})
export class ReactionKeyboardService implements OnDestroy {
    /**
     * Emits the pressed state of the alt key.
     */
    public readonly alt$: Observable<boolean>;

    /**
     * Emits the pressed state of the ctrl key.
     */
    public readonly ctrl$: Observable<boolean>;

    /**
     * Emits the pressed state of the shift key.
     */
    public readonly shift$: Observable<boolean>;

    /**
     * Emits the pressed state of the meta key.
     */
    public readonly meta$: Observable<boolean>;

    /**
     * Destroy event.
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Emits the current state of the keyboard.
     */
    private readonly _state$: BehaviorSubject<KeyboardState> = new BehaviorSubject<KeyboardState>({
        ctrlKey: false,
        altKey: false,
        metaKey: false,
        shiftKey: false
    });

    /**
     * Constructor
     */
    public constructor(@Inject(DOCUMENT) private _doc: any) {
        const keyUpEvent: KeyboardEvent = new KeyboardEvent('keyup', {
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false
        });

        merge(
            fromEvent<KeyboardEvent>(_doc, 'keydown'),
            fromEvent<KeyboardEvent>(_doc, 'keyup'),
            fromEvent(window, 'blur').pipe(mapTo(keyUpEvent))
        ).pipe(
            takeUntil(this._destroyed$)
        ).subscribe(({ctrlKey, altKey, shiftKey, metaKey}: KeyboardEvent) => this._state$.next({ctrlKey, altKey, shiftKey, metaKey}));

        this.ctrl$ = this._state$.pipe(
            map(s => s.ctrlKey),
            distinctUntilChanged()
        );

        this.alt$ = this._state$.pipe(
            map(s => s.altKey),
            distinctUntilChanged()
        );

        this.shift$ = this._state$.pipe(
            map(s => s.shiftKey),
            distinctUntilChanged()
        );

        this.meta$ = this._state$.pipe(
            map(s => s.metaKey),
            distinctUntilChanged()
        );
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
