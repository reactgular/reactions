import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {reactionSort} from '../../core/reaction-sort/reaction-sort';
import {ReactionObject} from '../../core/reaction-types';

@Pipe({name: 'reactionSort$', pure: true})
export class ReactionSortPipe implements PipeTransform {
    /**
     *
     */
    public transform(reactions: ReactionObject[], args?: any): Observable<ReactionObject[]> {
        if (!(reactions instanceof Array)) {
            return undefined;
        }
        return reactionSort(reactions);
    }
}
