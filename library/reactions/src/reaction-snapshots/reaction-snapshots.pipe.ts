import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {isReactionTitle} from '../reaction-types/reaction-title';
import {ReactionSnapshots, toReactionSnapshots} from './reaction-snapshots';
import {ReactionBase} from '../reaction-base/reaction-base';

@Pipe({name: 'reactionSnapshots', pure: true})
export class ReactionSnapshotsPipe implements PipeTransform {
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    public transform(value: ReactionBase): Observable<ReactionSnapshots> {
        return isReactionTitle(value) ? toReactionSnapshots(value) : of();
    }
}
