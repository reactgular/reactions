import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {ReactionObject} from '@reactgular/reactions';
import {REACTION_MAT_BUTTON_TYPES, ReactionMatButtonType} from '@reactgular/reactions-material';
import {TOP_BAR_TOKEN} from '../demo/demo.component';

/**
 * Renders an example of all possible button styles.
 */
@Component({
    selector: 'rg-buttons-example',
    templateUrl: './buttons-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsExampleComponent {
    /**
     * Collection of button rows.
     */
    public types: ReactionMatButtonType[] = REACTION_MAT_BUTTON_TYPES;

    /**
     * Constructor
     */
    public constructor(@Inject(TOP_BAR_TOKEN) public reactions: ReactionObject[]) {
    }
}
