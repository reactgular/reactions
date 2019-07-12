import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactionSnapshot, toReactionSnapshot} from './reaction-snapshot';
import {ReactionObject} from '../reaction/reaction-types';

@Pipe({name: 'reactionSnapshot', pure: true})
export class ReactionSnapshotPipe implements PipeTransform {
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    public transform(value: ReactionObject): Observable<ReactionSnapshot> {
        return typeof value === 'object' ? toReactionSnapshot(value) : undefined;
    }
}
