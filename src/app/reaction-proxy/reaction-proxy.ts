import {Injector} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {ReactionConfig} from '../../../library/reactions/src/reaction-config/reaction-config';
import {ReactionHook} from '../../../library/reactions/src/reaction-decorators/reaction-hook';
import {ReactionEvent} from '../../../library/reactions/src/reaction-events/reaction-event';
import {ReactionSnapshots} from '../../../library/reactions/src/reaction-snapshots/reaction-snapshots';
import {ReactionIcon, ReactionIconAnimate} from '../../../library/reactions/src/reaction-types/reaction-icon';
import {ReactionStyle} from '../../../library/reactions/src/reaction-types/reaction-style';
import {ReactionTooltip} from '../../../library/reactions/src/reaction-types/reaction-tooltip';
import {Reaction} from '../../../library/reactions/src/reaction/reaction';

/**
 * Emits reaction values from the internal snapshot.
 */
export class ReactionProxy extends Reaction implements ReactionStyle, ReactionIcon, ReactionTooltip {
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

    public animate(): Observable<ReactionIconAnimate> | ReactionIconAnimate {
        return undefined;
    }

    public css(): Observable<string | string[] | void> {
        return this._snapshot$.pipe(map(snapshot => snapshot.css));
    }

    @ReactionHook(MouseEvent, 'click')
    public example1(event: ReactionEvent<MouseEvent>) {
        console.error('CALLED!');
    }

    @ReactionHook(MouseEvent, 'click')
    public example2(event: ReactionEvent<MouseEvent>) {
        console.error('CALLED!');
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

    public secondary(): Observable<string> | string {
        return undefined;
    }

    public secondaryAnimate(): Observable<ReactionIconAnimate> | ReactionIconAnimate {
        return undefined;
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
