import {Directive, OnDestroy, OnInit, Optional} from '@angular/core';
import {of, Subject} from 'rxjs';
import {defaultIfEmpty, pairwise, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {assertReactionModel, ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {isReactionStyle, ReactionColor} from '../reaction/reaction-style';

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

        this._reactionModel.reaction$.pipe(
            switchMap(reaction => isReactionStyle(reaction) ? reaction.color() : of(undefined)),
            startWith<ReactionColor, ReactionColor>(undefined),
            defaultIfEmpty(undefined),
            pairwise()
        ).subscribe(([prev, next]: [ReactionColor, ReactionColor]) => {

        });

        this._reactionModel.snapshot$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(snapshot => {
            console.log(snapshot);
        });
    }
}
