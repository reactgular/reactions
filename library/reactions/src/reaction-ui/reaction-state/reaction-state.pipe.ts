import {Pipe, PipeTransform} from '@angular/core';
import {ReactionObject} from '../../reaction-engine/reaction/reaction-types';
import {ReactionState, toReactionState} from '../../reaction-engine/reaction-state/reaction-state';

@Pipe({name: 'reactionState', pure: true})
export class ReactionStatePipe implements PipeTransform {
    /**
     * Hydrates a reaction and converts to a reaction state object of observable properties.
     */
    public transform(value: ReactionObject): ReactionState {
        return typeof value === 'object' ? toReactionState(value) : undefined;
    }
}
