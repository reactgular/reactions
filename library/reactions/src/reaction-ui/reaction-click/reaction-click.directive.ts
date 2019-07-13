import {Directive, ElementRef, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {ReactionCoreService} from '../../reaction-services/reaction-core/reaction-core.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {disabledWhen, withSwitchMap} from '../../reaction-utils/observables';
import {combineEvents} from '../../reaction-utils/combine-events';
import {ReactionProvider} from '../reaction-provider/reaction-provider';

@Directive({selector: '[rgReactionClick]'})
export class ReactionClickDirective implements OnInit, OnDestroy {
    /**
     * Destructor event
     */
    public readonly destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(private readonly _reactionProvider: ReactionProvider,
                       private readonly _reactionCore: ReactionCoreService,
                       private readonly _el: ElementRef<HTMLElement>,
                       private readonly _view: ViewContainerRef) {
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        const disabled$ = this._reactionProvider.state$.pipe(
            switchMap(state => state.disabled)
        );

        this._reactionProvider.reaction$.pipe(
            withSwitchMap(reaction => combineEvents(this._el, reaction.__REACTION__)),
            disabledWhen(disabled$),
            takeUntil(this.destroyed$)
        ).subscribe(([reaction, event]) => this._reactionCore.broadcast(reaction, event.type, event, this._el, this._view));
    }
}
