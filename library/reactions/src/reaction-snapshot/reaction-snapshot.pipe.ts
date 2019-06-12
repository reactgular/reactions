import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {isReaction} from '../reaction/reaction';
import {createSnapshot, ReactionSnapshot} from './reaction-snapshot';

@Pipe({name: 'reactionSnapshot', pure: true})
export class ReactionSnapshotPipe implements PipeTransform {
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    public transform(value: any): Observable<ReactionSnapshot> {
        return isReaction(value) ? createSnapshot(value) : of();
    }
}
