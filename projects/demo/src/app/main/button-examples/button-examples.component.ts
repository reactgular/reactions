import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ReactionObject} from '@reactgular/reactions/lib/core/reaction-types';
import {TOP_BAR_TOKEN} from '../outlet-main/outlet-main.component';

@Component({
    selector: 'rg-button-examples',
    templateUrl: './button-examples.component.html',
    styleUrls: ['./button-examples.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonExamplesComponent {
    /**
     * Constructor
     */
    public constructor(@Inject(TOP_BAR_TOKEN) public reactions: ReactionObject[]) {
    }
}
