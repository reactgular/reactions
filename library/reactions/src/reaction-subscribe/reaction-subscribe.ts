import {ReactionObject} from '../reaction/reaction';
import {Observable} from 'rxjs';
import {ReactionSnapshot, toReactionSnapshot} from '../reaction-snapshots/reaction-snapshot';
import {ReactionState, toReactionState} from '../reaction-state/reaction-state';
import {ReactionEvent} from '../reaction-event/reaction-event';

export class ReactionSubscribe {
    /**
     * Emits snapshots of the reaction.
     */
    public readonly snapshot$: Observable<ReactionSnapshot>;

    /**
     * Reaction as a state object.
     */
    public readonly state: ReactionState;

    /**
     * Constructor
     */
    public constructor(public readonly reaction: ReactionObject,
                       private readonly _disabled$: Observable<boolean>,
                       private readonly _events$: Observable<ReactionEvent>) {
        this.state = toReactionState(reaction);
        this.snapshot$ = toReactionSnapshot(reaction);
    }
}
