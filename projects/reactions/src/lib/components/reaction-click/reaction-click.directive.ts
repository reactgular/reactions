import {Directive, ElementRef, OnInit, ViewContainerRef} from '@angular/core';
import {Destroyable} from '@reactgular/destroyable';
import {disabledWhen, withSwitchMap} from '@reactgular/observables';
import {switchMap, takeUntil} from 'rxjs/operators';
import {reactionEventObservable} from '../../core/reaction-event/reaction-event-observable';
import {ReactionObject} from '../../core/reaction-types';
import {ReactionCoreService} from '../../services/reaction-core/reaction-core.service';
import {ReactionProvider} from '../../services/reaction-provider/reaction-provider';

@Directive({selector: '[rgReactionClick]'})
export class ReactionClickDirective extends Destroyable implements OnInit {
    /**
     * Constructor
     */
    public constructor(private readonly _reactionProvider: ReactionProvider,
                       private readonly _reactionCore: ReactionCoreService,
                       private readonly _el: ElementRef<HTMLElement>,
                       private readonly _view: ViewContainerRef) {
        super();
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        const disabled$ = this._reactionProvider.state$.pipe(
            switchMap(state => state.disabled)
        );

        this._reactionProvider.reaction$.pipe(
            withSwitchMap((reaction: ReactionObject) => reactionEventObservable(
                this._el.nativeElement,
                reaction.__REACTION__.filter(hook => hook.source === 'element')
            )),
            disabledWhen(disabled$),
            takeUntil(this.destroyed$)
        ).subscribe(([reaction, event]) => this._reactionCore.broadcast(reaction, event, 'element', this._el, this._view));
    }
}
