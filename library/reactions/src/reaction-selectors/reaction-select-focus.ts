import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for focus events.
 */
export class ReactionSelectFocus {
    public static readonly EVENTS = [
        'focus',
        'blur'
    ];
ß
    /**
     * Emits only focus events.
     */
    public readonly events$: Observable<ReactionUIEvent<FocusEvent>>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionUIEvent<FocusEvent>>(event => isReactionUIEvent(event) && event.event instanceof FocusEvent)
        );
    }
}
