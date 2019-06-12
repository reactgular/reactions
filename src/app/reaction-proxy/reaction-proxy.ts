import {Observable, of, ReplaySubject} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {ReactionConfig} from '../../../library/reactions/src/reaction-config/reaction-config';
import {ReactionSnapshot} from '../../../library/reactions/src/reaction-snapshot/reaction-snapshot';
import {Reaction} from '../../../library/reactions/src/reaction/reaction';
import {ReactionStyle} from '../../../library/reactions/src/reaction/reaction-style';

/**
 * Emits reaction values from the internal snapshot.
 */
export class ReactionProxy implements Reaction, ReactionStyle {
    /**
     * The internal state of the reaction.
     */
    private readonly _snapshot$: ReplaySubject<ReactionSnapshot> = new ReplaySubject(1);

    /**
     * Constructor
     */
    public constructor(public readonly config: Partial<ReactionConfig>) {

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
    public next(snapshot: ReactionSnapshot) {
        this._snapshot$.next(snapshot);
    }

    /**
     * Gets the internal snapshot.
     */
    public snapshot(): Observable<ReactionSnapshot> {
        return this._snapshot$.asObservable();
    }

    /**
     * Gets the first internal snapshot.
     */
    public snapshotOnce(): Observable<ReactionSnapshot> {
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
    public toolTip(): Observable<string> {
        return this._snapshot$.pipe(map(snapshot => snapshot.toolTip));
    }

    public css(): Observable<string | string[] | void> {
        return of('rg-danger');
    }
}
