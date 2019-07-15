import {Directive, Input} from '@angular/core';
import {ReactionProvider} from '../reaction-provider/reaction-provider';
import {Observable} from 'rxjs';
import {ReactionSnapshot} from '../reaction-snapshots/reaction-snapshot';
import {ReactionState} from '../../reaction-engine/reaction-state/reaction-state';

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[reaction]',
    providers: [ReactionProvider],
    exportAs: 'rgReaction'
})
export class ReactionModelDirective {
    /**
     * Emits states of the reaction object.
     */
    public state$: Observable<ReactionState> = this._reactionProvider.state$;

    /**
     * Emits snapshots of the reaction object.
     */
    public snapshot$: Observable<ReactionSnapshot> = this._reactionProvider.snapshot$;

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
        this._reactionProvider.set(reaction);
    }
}
