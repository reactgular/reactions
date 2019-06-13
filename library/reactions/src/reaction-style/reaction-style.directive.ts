import {Directive, ElementRef, OnDestroy, OnInit, Optional, Renderer2} from '@angular/core';
import {combineLatest, of, Subject} from 'rxjs';
import {map, pairwise, startWith, takeUntil} from 'rxjs/operators';
import {assertReactionModel, ReactionModelDirective} from '../reaction-model/reaction-model.directive';

/**
 * Applies CSS classes to the reaction component.
 */
@Directive({
    selector: '[rgReactionStyle]'
})
export class ReactionStyleDirective implements OnInit, OnDestroy {
    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(@Optional() private _reactionModel: ReactionModelDirective,
                       private _el: ElementRef<HTMLElement>,
                       private _renderer: Renderer2) {
        assertReactionModel('rgReactionStyle', _reactionModel);
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * Initializer
     */
    public ngOnInit(): void {
        this._renderer.addClass(this._el.nativeElement, 'rg-reaction');

        const toArray = (cond: any, value: string): string[] => cond ? [value] : [];
        const snapshot$ = this._reactionModel.snapshot$;
        const styles$ = [
            snapshot$.pipe(map(s => s.css)),
            snapshot$.pipe(map(s => toArray(s.icon, 'rg-reaction-icon'))),
            snapshot$.pipe(map(s => toArray(s.title, 'rg-reaction-title'))),
            snapshot$.pipe(map(s => toArray(s.tooltip, 'rg-reaction-tooltip'))),
            snapshot$.pipe(map(s => toArray(s.animate, 'rg-reaction-animate'))),
            snapshot$.pipe(map(s => toArray(s.disabled, 'rg-reaction-disabled')))
        ];

        const x: any = true;
        of(false).pipe(startWith(x));

        combineLatest(styles$).pipe(
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
