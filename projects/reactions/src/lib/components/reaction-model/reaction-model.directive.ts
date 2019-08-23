import {Directive, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionState} from '../../core/reaction-state/reaction-state';
import {ReactionProvider} from '../../services/reaction-provider/reaction-provider';

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    selector: '[rgReaction]',
    providers: [ReactionProvider],
    exportAs: 'rgReaction'
})
export class ReactionModelDirective {
    public disabled$: Observable<boolean>;

    /**
     * Emits snapshots of the reaction object.
     */
    public snapshot$: Observable<ReactionSnapshot> = this._reactionProvider.snapshot$;

    /**
     * Emits states of the reaction object.
     */
    public state$: Observable<ReactionState> = this._reactionProvider.state$;

    /**
     * Constructor
     */
    public constructor(private readonly _reactionProvider: ReactionProvider) {
        this.disabled$ = this._reactionProvider.snapshot$.pipe(
            map(state => state.disabled)
        );
    }

    /**
     * Sets the reaction object. We use unknown to reduce warnings in templates.
     */
    @Input('rgReaction')
    public set reaction(reaction: unknown) {
        this._reactionProvider.set(reaction);
    }
}
