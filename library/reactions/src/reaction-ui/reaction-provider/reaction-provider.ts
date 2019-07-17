import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {ReactionObject} from '../../reaction-engine/reaction/reaction-types';
import {ReactionSnapshot, toReactionSnapshot} from '../../reaction-engine/reaction-snapshot/reaction-snapshot';
import {ReactionState, toReactionState} from '../../reaction-engine/reaction-state/reaction-state';
import {distinctUntilChanged, filter, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {hydrateReaction} from '../../reaction-utils/hydrate-reaction';

@Injectable()
export class ReactionProvider {
    /**
     * Emits changes to the reaction object.
     */
    public reaction$: Observable<ReactionObject>;

    /**
     * Emits the reaction as a state object.
     */
    public state$: Observable<ReactionState>;

    /**
     * Emits snapshots of the reaction.
     */
    public snapshot$: Observable<ReactionSnapshot>;

    /**
     * Emits the reaction object.
     */
    private readonly _reaction$: ReplaySubject<ReactionObject> = new ReplaySubject(1);

    /**
     * Constructor
     */
    public constructor() {
        this.reaction$ = this._reaction$.pipe(
            filter(reaction => typeof reaction === 'object'),
            distinctUntilChanged(),
            map(hydrateReaction),
            shareReplay(1)
        );

        this.state$ = this.reaction$.pipe(
            map(toReactionState),
            shareReplay(1)
        );

        this.snapshot$ = this.state$.pipe(
            switchMap(toReactionSnapshot),
            shareReplay(1)
        );
    }

    /**
     * Sets the reaction object.
     */
    public set(reaction: unknown) {
        this._reaction$.next(reaction as ReactionObject);
    }
}
