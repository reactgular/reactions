import {Inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';

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
     * Emits when the ESC is pressed.
     */
    public readonly esc$: Observable<void>;

    /**
     * Emits the pressed state of the shift key.
     */
    public readonly shift$: Observable<boolean>;

    /**
     * Emitter for alt
     */
    private readonly _alt$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Emitter for ctrl
     */
    private readonly _ctrl$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Emitter for esc
     */
    private readonly _esc$: Subject<void> = new Subject();

    /**
     * Emitter for shift
     */
    private readonly _shift$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Constructor
     */
    public constructor(@Inject(DOCUMENT) private _doc: Document) {
        merge(fromEvent<KeyboardEvent>(_doc, 'keydown'), fromEvent<KeyboardEvent>(_doc, 'keyup'))
            .pipe(takeUntil(this._destroyed$))
            .subscribe(event => {
                this._ctrl$.next(Boolean(event.ctrlKey));
                this._alt$.next(Boolean(event.altKey));
                this._shift$.next(Boolean(event.shiftKey));
            });

        fromEvent(window, 'blur')
            .pipe(takeUntil(this._destroyed$))
            .subscribe(() => {
                this._ctrl$.next(false);
                this._alt$.next(false);
                this._shift$.next(false);
            });

        fromEvent<KeyboardEvent>(_doc, 'keyup').pipe(
            filter(event => typeof event.key === 'string' && (event.key.toUpperCase() === 'ESCAPE' || event.key.toUpperCase() === 'ESC')),
            takeUntil(this._destroyed$)
        ).subscribe(() => this._esc$.next());

        this.ctrl$ = this._ctrl$.pipe(distinctUntilChanged());
        this.alt$ = this._alt$.pipe(distinctUntilChanged());
        this.shift$ = this._shift$.pipe(distinctUntilChanged());
        this.esc$ = this._esc$.asObservable();
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
