import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ReactionObject} from '../reaction/reaction';
import {ReactionSnapshots, toReactionSnapshots} from './reaction-snapshots';

@Pipe({name: 'reactionSnapshots', pure: true})
export class ReactionSnapshotsPipe implements PipeTransform {
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    public transform(value: ReactionObject): Observable<ReactionSnapshots> {
        return typeof value === 'object' ? toReactionSnapshots(value) : of();
    }
}
