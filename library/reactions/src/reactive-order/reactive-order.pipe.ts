import {Pipe, PipeTransform} from '@angular/core';
import {Reaction} from '../reaction/reaction';
import {reactionConfig} from '../reaction-config/reaction-config';

@Pipe({name: 'reactiveOrder', pure: true})
export class ReactiveOrderPipe implements PipeTransform {
    public transform(value: Reaction[]): any {
        function getOrder(tool: Reaction): string {
            return tool && tool.config && tool.config.order;
        }


        if (value instanceof Array) {
            value.sort((a, b) => {
                const ca = getOrder(a);
                const cb = getOrder(b);
                if (ca === cb) {
                    return 0;
                }
                return ca < cb ? -1 : 1;
            });
        }
        return value;
    }
}
