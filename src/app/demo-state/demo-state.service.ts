import {Injectable} from '@angular/core';
import {ReactionSnapshots} from '../../../library/reactions/src/reaction-snapshots/reaction-snapshots';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DemoStateService {
    /**
     * The internal state of the reaction.
     */
    private readonly _snapshot$: ReplaySubject<ReactionSnapshots> = new ReplaySubject(1);

    /**
     * Emits the reaction snapshot from the editor.
     */
    public get snapshot$(): Observable<ReactionSnapshots> {
        return this._snapshot$.asObservable();
    }

    /**
     * Emits a change to the snapshot.
     */
    public next(snapshot: ReactionSnapshots) {
        this._snapshot$.next(snapshot);
    }
}
