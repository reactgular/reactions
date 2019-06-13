import {Directive, Input, OnInit} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, filter, map, shareReplay, switchMap} from 'rxjs/operators';
import {ReactionSnapshots, toReactionSnapshots} from '../reaction-snapshots/reaction-snapshots';
import {isReaction, Reaction} from '../reaction/reaction';
import {ReactionStates, toReactionStates} from '../reaction-states/reaction-states';

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
     * Emits the reaction as a state object.
     */
    public state$: Observable<ReactionStates>;

    /**
     * Emits snapshots of the reaction.
     */
    public snapshot$: Observable<ReactionSnapshots>;

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

        this.state$ = this.reaction$.pipe(
            map(reaction => toReactionStates(reaction)),
            shareReplay(1)
        );

        this.snapshot$ = this.reaction$.pipe(
            switchMap(reaction => toReactionSnapshots(reaction)),
            shareReplay(1)
        );
    }
}
