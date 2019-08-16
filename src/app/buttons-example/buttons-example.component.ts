import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TOP_BAR_TOKEN} from '../demo/demo.component';
import {ReactionObject} from '@reactgular/reactions';

@Component({
    selector: 'rg-buttons-example',
    templateUrl: './buttons-example.component.html',
    styleUrls: ['./buttons-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsExampleComponent {
    public constructor(@Inject(TOP_BAR_TOKEN) public reactions: ReactionObject[]) {
    }
}
