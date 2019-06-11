import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {scan} from 'rxjs/operators';
import {ReactionEvent} from '../reaction-events/reaction-event';
import {ReactionMouseEvent} from '../reaction-events/reaction-mouse-event';
import {ReactionSelector} from '../reaction-selectors/reaction-selector';
import {Reaction} from '../reaction/reaction';

/**
 * Reactions trigger UI events via this service, and then they can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 *
 * Consumers filter events to select which ones they want to react to.
 */
@Injectable({providedIn: 'root'})
export class ReactionCoreService extends ReactionSelector {
    /**
     * Emitter of the events.
     */
    private readonly _events$: Subject<ReactionEvent>;

    /**
     * Constructor
     */
    public constructor() {
        const events$ = new Subject<ReactionEvent>();
        const eventsWithId$ = events$.pipe(scan((acc, next) => ({...next, id: acc.id + 1}), {id: 0} as ReactionEvent));

        super(eventsWithId$);

        this._events$ = events$;
    }

    /**
     * Emits a mouse event.
     */
    public emitMouse(reaction: Reaction, event: MouseEvent, data?: any) {
        const type = 'mouse', id = 0;
        this._events$.next({id, type, reaction, event, data} as ReactionMouseEvent);
    }
}
