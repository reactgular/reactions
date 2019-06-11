import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for drag events.
 */
export class ReactionSelectDrag {
    /**
     * List of event types.
     */
    public static readonly EVENTS = [
        'dragend',
        'dragenter',
        'dragstart',
        'dragleave',
        'dragover',
        'drop'
    ];

    /**
     * Emits only drag events.
     */
    public readonly events$: Observable<ReactionUIEvent<DragEvent>>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionUIEvent<DragEvent>>(event => isReactionUIEvent(event) && event.event instanceof DragEvent)
        );
    }

    /**
     * Selects only dragend events.
     */
    public dragend(): Observable<ReactionUIEvent<DragEvent>> {
        return this._filter('dragend');
    }

    /**
     * Selects only dragenter events.
     */
    public dragenter(): Observable<ReactionUIEvent<DragEvent>> {
        return this._filter('dragenter');
    }

    /**
     * Selects only dragstart events.
     */
    public dragstart(): Observable<ReactionUIEvent<DragEvent>> {
        return this._filter('dragstart');
    }

    /**
     * Selects only dragleave events.
     */
    public dragleave(): Observable<ReactionUIEvent<DragEvent>> {
        return this._filter('dragleave');
    }

    /**
     * Selects only dragover events.
     */
    public dragover(): Observable<ReactionUIEvent<DragEvent>> {
        return this._filter('dragover');
    }

    /**
     * Selects only drop events.
     */
    public drop(): Observable<ReactionUIEvent<DragEvent>> {
        return this._filter('drop');
    }

    /**
     * Filters events by the given type.
     */
    private _filter(type: string): Observable<ReactionUIEvent<DragEvent>> {
        return this.events$.pipe(filter(event => event.event.type === type));
    }
}
