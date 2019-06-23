import {Pipe, PipeTransform} from '@angular/core';
import {ReactionObject} from '../reaction/reaction';

/**
 * This pipe sorts the order of a reaction collection by their configured order.
 */
@Pipe({name: 'reactiveOrder', pure: true})
export class ReactionOrderPipe implements PipeTransform {
    public transform(value: ReactionObject[]): any {
        if (value instanceof Array) {
            value = [...value];
            value.sort((a, b) => {
                const ca = a && a.config && a.config.order;
                const cb = b && b.config && b.config.order;
                return ca === cb ? 0 : (ca < cb ? -1 : 1);
            });
        }
        return value;
    }
}
