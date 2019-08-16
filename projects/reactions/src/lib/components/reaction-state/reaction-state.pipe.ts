import {Pipe, PipeTransform} from '@angular/core';
import {ReactionState, toReactionState} from '../../core/reaction-state/reaction-state';
import {ReactionObject} from '../../core/reaction-types';

@Pipe({name: 'reactionState', pure: true})
export class ReactionStatePipe implements PipeTransform {
    /**
     * Hydrates a reaction and converts to a reaction state object of observable properties.
     */
    public transform(value: ReactionObject): ReactionState {
        return typeof value === 'object' ? toReactionState(value) : undefined;
    }
}
