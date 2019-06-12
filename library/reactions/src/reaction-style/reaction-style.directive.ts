import {Directive, ElementRef, OnDestroy, OnInit, Optional, Renderer2} from '@angular/core';
import {Subject} from 'rxjs';
import {map, pairwise, startWith, switchMap, takeUntil} from 'rxjs/operators';
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

        this._reactionModel.state$.pipe(
            switchMap(state$ => state$.css$),
            startWith<string[], string[]>([]),
            pairwise(),
            map(([prev, next]: [string[], string[]]) => {
                return {
                    add: next.filter(x => !prev.includes(x)),
                    remove: prev.filter(x => !next.includes(x))
                }
            }),
            takeUntil(this._destroyed$)
        ).subscribe((change: { add: string[], remove: string[] }) => {
            change.add.forEach(css => this._renderer.addClass(this._el.nativeElement, css));
            change.remove.forEach(css => this._renderer.removeClass(this._el.nativeElement, css));
            console.log('color', change);
        });

        this._reactionModel.snapshot$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(snapshot => {
            console.log(snapshot);
        });
    }
}
