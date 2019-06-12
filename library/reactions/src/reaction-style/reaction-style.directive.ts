import {Directive, OnDestroy, OnInit, Optional} from '@angular/core';
import {Subject} from 'rxjs';
import {pairwise, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {assertReactionModel, ReactionModelDirective} from '../reaction-model/reaction-model.directive';

/**
 * Applies CSS classes to the reaction component.
 */
@Directive({
    selector: '[rgReactionStyle]'
})
export class ReactionStyleDirective implements OnInit, OnDestroy {
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(@Optional() private _reactionModel: ReactionModelDirective) {
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
            pairwise()
        ).subscribe(([prev, next]: [string[], string[]]) => {
            console.log('color', prev, next);
        });

        this._reactionModel.snapshot$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(snapshot => {
            console.log(snapshot);
        });
    }
}
