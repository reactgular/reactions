import {Pipe, PipeTransform} from '@angular/core';
import {ReactionObject} from '../../core/reaction/reaction-types';
import {Observable} from 'rxjs';
import {reactionSort} from '../../core/reaction-sort/reaction-sort';

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
