import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {combineLatest, Subject} from 'rxjs';
import {map, pairwise, startWith, takeUntil} from 'rxjs/operators';
import {ReactionProvider} from '../reaction-provider/reaction-provider';

@Directive({selector: '[rgReactionClass]'})
export class ReactionClassDirective implements OnInit, OnDestroy {
    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(private readonly _reactionProvider: ReactionProvider,
                       private readonly _el: ElementRef<HTMLElement>,
                       private readonly _renderer: Renderer2) {
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        this._renderer.addClass(this._el.nativeElement, 'rg-reaction');

        const snapshot$ = this._reactionProvider.snapshot$;
        const toArray = (cond: any, value: string): string[] => cond ? [value] : [];
        const styles$ = [
            snapshot$.pipe(map(s => s.css)),
            snapshot$.pipe(map(s => toArray(s.icon, 'rg-reaction-icon'))),
            snapshot$.pipe(map(s => toArray(s.secondary, 'rg-reaction-secondary'))),
            snapshot$.pipe(map(s => toArray(s.title, 'rg-reaction-title'))),
            snapshot$.pipe(map(s => toArray(s.tooltip, 'rg-reaction-tooltip'))),
            snapshot$.pipe(map(s => toArray(s.animate, 'rg-reaction-animate'))),
            snapshot$.pipe(map(s => toArray(s.disabled, 'rg-reaction-disabled')))
        ];

        combineLatest(styles$).pipe(
            // merge all the CSS arrays into a single array
            map((values) => values.reduce((acc, next) => ([...acc, ...next]), [])),
            startWith([]),
            pairwise(),
            map(([prev, next]: [string[], string[]]) => {
                return {
                    add: next.filter(x => !prev.includes(x)),
                    remove: prev.filter(x => !next.includes(x))
                };
            }),
            takeUntil(this._destroyed$)
        ).subscribe((change: { add: string[], remove: string[] }) => {
            change.add.forEach(css => this._renderer.addClass(this._el.nativeElement, css));
            change.remove.forEach(css => this._renderer.removeClass(this._el.nativeElement, css));
        });
    }
}