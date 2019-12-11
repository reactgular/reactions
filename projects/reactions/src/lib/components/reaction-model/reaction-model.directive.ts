import {Directive, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionState} from '../../core/reaction-state/reaction-state';
import {ReactionProvider} from '../../services/reaction-provider/reaction-provider';

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    selector: '[rgReaction],button[reaction]',
    providers: [ReactionProvider],
    exportAs: 'rgReaction'
})
export class ReactionModelDirective {
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
    }

    /**
     * Sets the reaction object. We use unknown to reduce warnings in templates.
     */
    @Input('reaction')
    public set reaction(reaction: unknown) {
        this.rgReaction = reaction;
    }

    /**
     * Sets the reaction object. We use unknown to reduce warnings in templates.
     */
    @Input('rgReaction')
    public set rgReaction(reaction: unknown) {
        this._reactionProvider.set(reaction);
    }
}
