import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {isReaction} from '../reaction/reaction';
import {ReactionSnapshots, toReactionSnapshots} from './reaction-snapshots';

@Pipe({name: 'reactionSnapshots', pure: true})
export class ReactionSnapshotsPipe implements PipeTransform {
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    public transform(value: any): Observable<ReactionSnapshots> {
        return isReaction(value) ? toReactionSnapshots(value) : of();
    }
}
