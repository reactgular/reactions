import {Injector} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {ReactionConfig} from '../../../library/reactions/src/reaction-config/reaction-config';
import {ReactionClickEvent} from '../../../library/reactions/src/reaction-events/reaction-mouse-events';
import {ReactionUIEvent} from '../../../library/reactions/src/reaction-events/reaction-ui-event';
import {ReactionSnapshots} from '../../../library/reactions/src/reaction-snapshots/reaction-snapshots';
import {ReactionIcon} from '../../../library/reactions/src/reaction-types/reaction-icon';
import {ReactionStyle} from '../../../library/reactions/src/reaction-types/reaction-style';
import {ReactionTooltip} from '../../../library/reactions/src/reaction-types/reaction-tooltip';
import {Reaction} from '../../../library/reactions/src/reaction/reaction';

/**
 * Emits reaction values from the internal snapshot.
 */
export class ReactionProxy extends Reaction implements ReactionStyle, ReactionIcon, ReactionTooltip, ReactionClickEvent {
    /**
     * The internal state of the reaction.
     */
    private readonly _snapshot$: ReplaySubject<ReactionSnapshots> = new ReplaySubject(1);

    /**
     * Constructor
     */
    public constructor(config: ReactionConfig, injector: Injector) {
        super(config, injector);
    }

    public click(event: ReactionUIEvent<MouseEvent>) {
        console.log('click!!!', event);
    }

    public css(): Observable<string | string[] | void> {
        return this._snapshot$.pipe(map(snapshot => snapshot.css));
    }

    /**
     * Gets the icon state
     */
    public icon(): Observable<string> {
        return this._snapshot$.pipe(map(snapshot => snapshot.icon));
    }

    /**
     * Emits a change to the internal snapshot.
     */
    public next(snapshot: ReactionSnapshots) {
        this._snapshot$.next(snapshot);
    }

    /**
     * Gets the internal snapshot.
     */
    public snapshot(): Observable<ReactionSnapshots> {
        return this._snapshot$.asObservable();
    }

    /**
     * Gets the first internal snapshot.
     */
    public snapshotOnce(): Observable<ReactionSnapshots> {
        return this.snapshot().pipe(first());
    }

    /**
     * Gets the title state
     */
    public title(): Observable<string> {
        return this._snapshot$.pipe(map(snapshot => snapshot.title));
    }

    /**
     * Gets the tool tip state.
     */
    public tooltip(): Observable<string> {
        return this._snapshot$.pipe(map(snapshot => snapshot.tooltip));
    }
}
