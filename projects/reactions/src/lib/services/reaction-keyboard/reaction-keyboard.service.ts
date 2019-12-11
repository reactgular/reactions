import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {Destroyable} from '@reactgular/destroyable';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {distinctUntilChanged, map, mapTo, takeUntil} from 'rxjs/operators';

interface KeyboardState {
    altKey: boolean;

    ctrlKey: boolean;

    metaKey: boolean;

    shiftKey: boolean;
}

/**
 * A service for consuming events from the keyboard.
 */
@Injectable({providedIn: 'root'})
export class ReactionKeyboardService extends Destroyable {
    /**
     * Emits the pressed state of the alt key.
     */
    public readonly alt$: Observable<boolean>;

    /**
     * Emits the pressed state of the ctrl key.
     */
    public readonly ctrl$: Observable<boolean>;

    /**
     * Emits the pressed state of the meta key.
     */
    public readonly meta$: Observable<boolean>;

    /**
     * Emits the pressed state of the shift key.
     */
    public readonly shift$: Observable<boolean>;

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
        super();

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
}
