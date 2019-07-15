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
     * Emits when the ESC key is pressed.
     */
    public readonly esc$: Observable<void>;

    /**
     * Emits when the DEL or BACKSPACE key is pressed.
     */
    public readonly del$: Observable<void>;

    /**
     * Emits when the ENTER key is pressed.
     */
    public readonly enter$: Observable<void>;

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
            // @todo need to test if there is a blur event on the document
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

        this.esc$ = this.keyboard('ESCAPE', true);
        this.enter$ = this.keyboard('ENTER', true);
        this.del$ = this.keyboards(['DELETE', 'BACKSPACE'], true).pipe(mapTo(undefined));
    }

    /**
     * Emits when the keyboard event for the key is released.
     */
    public keyboard(key: string, ignoreCase?: boolean): Observable<void> {
        return this.keyboards([key], ignoreCase).pipe(mapTo(undefined));
    }

    /**
     * Emits when the keyboard event for one of the keys is released.
     *
     * Note: Always emits the key as uppercase.
     */
    public keyboards(keys: string[], ignoreCase?: boolean): Observable<string> {
        keys = ignoreCase ? keys.map(k => k.toUpperCase()) : keys;
        const keysMatch = (key: string) => keys.indexOf(ignoreCase ? key.toUpperCase() : key);
        return fromEvent<KeyboardEvent>(this._doc, 'keyup').pipe(
            filter((event: KeyboardEvent) => typeof event.key === 'string' && keysMatch(event.key) !== -1),
            map((event: KeyboardEvent) => event.key.toUpperCase())
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
