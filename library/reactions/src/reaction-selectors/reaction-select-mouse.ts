import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {isReactionUIEvent, ReactionUIEvent} from '../reaction-events/reaction-ui-event';

/**
 * A selector for mouse events.
 */
export class ReactionSelectMouse {
    public static readonly EVENTS = [
        'auxclick',
        'click',
        'contextmenu',
        'dblclick',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mouseover',
        'mouseout',
        'mouseup',
        'wheel'
    ];

    /**
     * Emits only mouse events.
     */
    public readonly events$: Observable<ReactionUIEvent<MouseEvent>>;

    /**
     * Constructor
     */
    public constructor(events: Observable<ReactionEvent>) {
        this.events$ = events.pipe(
            filter<ReactionUIEvent<MouseEvent>>(event => isReactionUIEvent(event) && event.event instanceof MouseEvent)
        );
    }

    public auxclick(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('auxclick');
    }

    public click(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('click');
    }

    public contextmenu(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('contextmenu');
    }

    public dblclick(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('dblclick');
    }

    public mousedown(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mousedown');
    }

    public mouseenter(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseenter');
    }

    public mouseleave(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseleave');
    }

    public mouseover(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseover');
    }

    public mouseout(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseout');
    }

    public mouseup(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('mouseup');
    }

    public wheel(): Observable<ReactionUIEvent<MouseEvent>> {
        return this._filter('wheel');
    }

    private _filter(type: string): Observable<ReactionUIEvent<MouseEvent>> {
        return this.events$.pipe(filter(event => event.event.type === type));
    }
}
