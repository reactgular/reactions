import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, filter, map, pluck, shareReplay, switchMap} from 'rxjs/operators';
import {ReactionSnapshot, toReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionState, toReactionState} from '../../core/reaction-state/reaction-state';
import {ReactionObject} from '../../core/reaction-types';
import {hydrateReaction} from '../../utils/hydrate-reaction';

@Injectable()
export class ReactionProvider {
    /**
     * Emits the disabled state of the reaction object.
     */
    public disabled$: Observable<boolean>;

    /**
     * Emits changes to the reaction object.
     */
    public reaction$: Observable<ReactionObject>;

    /**
     * Emits snapshots of the reaction.
     */
    public snapshot$: Observable<ReactionSnapshot>;

    /**
     * Emits the reaction as a state object.
     */
    public state$: Observable<ReactionState>;

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

        this.disabled$ = this.snapshot$.pipe(pluck('disabled'));
    }

    /**
     * Sets the reaction object.
     */
    public set(reaction: unknown) {
        this._reaction$.next(reaction as ReactionObject);
    }
}
