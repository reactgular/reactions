import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionFocusEvent, ReactionFocusEvent} from '../reaction-events/reaction-focus-event';

/**
 * A selector for drag events.
 */
export class ReactionSelectFocus {
    public static readonly EVENTS = [
        'focus',
        'blur'
    ];

    /**
     * Emits only selectDrag events.
     */
    public readonly events$: Observable<ReactionFocusEvent>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionFocusEvent>(event => isReactionFocusEvent(event))
        );
    }
}
