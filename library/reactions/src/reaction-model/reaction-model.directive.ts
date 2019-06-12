import {Directive, Input, OnInit} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, filter, shareReplay, switchMap} from 'rxjs/operators';
import {createSnapshot, ReactionSnapshot} from '../reaction-snapshot/reaction-snapshot';
import {isReaction, Reaction} from '../reaction/reaction';

/**
 * Asserts that the rgReaction directive is present.
 */
export function assertReactionModel(name: string, reactionModel?: ReactionModelDirective) {
    if (!reactionModel) {
        throw new Error(`${name} requires a DOM element to have [ngReaction] assigned with a reaction object.`);
    }
}

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    selector: '[rgReaction]'
})
export class ReactionModelDirective implements OnInit {
    /**
     * Emits changes to the reaction object.
     */
    public reaction$: Observable<Reaction>;

    /**
     * Emits snapshots of the reaction.
     */
    public snapshot$: Observable<ReactionSnapshot>;

    /**
     * Emits the reaction object.
     */
    private readonly _reaction$: ReplaySubject<Reaction> = new ReplaySubject(1);

    /**
     * Sets the reaction object.
     */
    @Input('rgReaction')
    public set reaction(reaction: Reaction) {
        this._reaction$.next(reaction);
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        this.reaction$ = this._reaction$.pipe(
            filter(value => isReaction(value)),
            distinctUntilChanged(),
            shareReplay(1)
        );

        this.snapshot$ = this.reaction$.pipe(
            switchMap(reaction => createSnapshot(reaction)),
            shareReplay(1)
        );
    }
}
