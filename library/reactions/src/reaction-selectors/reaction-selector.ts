import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {Reaction} from '../reaction/reaction';
import {ReactionSelectDrag} from './reaction-select-drag';
import {ReactionSelectMouse} from './reaction-select-mouse';
import {ReactionSelectReaction} from './reaction-select-reaction';
import {ReactionSelectWheel} from './reaction-select-wheel';
import {ReactionSelectTouch} from './reaction-select-touch';

export abstract class ReactionSelector {
    /**
     * Emits events only for the current action.
     */
    public readonly events$: Observable<ReactionEvent>;

    /**
     * Constructor
     */
    protected constructor(events$: Observable<ReactionEvent>) {
        this.events$ = events$;
    }

    /**
     * Emits only selectDrag events.
     */
    public selectDrag(): ReactionSelectDrag {
        return new ReactionSelectDrag(this.events$);
    }

    /**
     * Selects only events for a given reaction.
     */
    public select(reaction: Reaction): ReactionSelectReaction {
        return new ReactionSelectReaction(this.events$, reaction);
    }

    /**
     * Emits only mouse events.
     */
    public selectMouse(): ReactionSelectMouse {
        return new ReactionSelectMouse(this.events$);
    }

    /**
     * Emits only touch events.
     */
    public selectTouch(): ReactionSelectTouch {
        return new ReactionSelectTouch(this.events$);
    }

    /**
     * Emits only wheel events.
     */
    public selectWheel(): ReactionSelectWheel {
        return new ReactionSelectWheel(this.events$);
    }

}
