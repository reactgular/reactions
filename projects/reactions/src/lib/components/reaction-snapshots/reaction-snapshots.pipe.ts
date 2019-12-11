import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactionSnapshot, toReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionObject} from '../../core/reaction-types';

@Pipe({name: 'reactionSnapshots$', pure: true})
export class ReactionSnapshotsPipe implements PipeTransform {
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    public transform(value: ReactionObject): Observable<ReactionSnapshot> {
        return typeof value === 'object' ? toReactionSnapshot(value) : undefined;
    }
}
