import {Observable} from 'rxjs';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionSelectDrag} from './reaction-select-drag';
import {ReactionSelectMouse} from './reaction-select-mouse';
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
     * Emits only drag events.
     */
    public drag(): ReactionSelectDrag {
        return new ReactionSelectDrag(this.events$);
    }

    /**
     * Emits only mouse events.
     */
    public mouse(): ReactionSelectMouse {
        return new ReactionSelectMouse(this.events$);
    }

    /**
     * Emits only touch events.
     */
    public touch(): ReactionSelectTouch {
        return new ReactionSelectTouch(this.events$);
    }
}
