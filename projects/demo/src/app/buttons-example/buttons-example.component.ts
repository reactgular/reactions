import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {REACTION_BUTTON_TYPES, ReactionButtonType, ReactionObject} from '@reactgular/reactions';
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
     * Button colors
     */
    public colors: ThemePalette[] = [undefined, 'primary', 'accent', 'warn'];

    /**
     * Selected button color
     */
    public color: ThemePalette = undefined;

    /**
     * Collection of button rows.
     */
    public types: ReactionButtonType[] = REACTION_BUTTON_TYPES;

    /**
     * Constructor
     */
    public constructor(@Inject(TOP_BAR_TOKEN) public reactions: ReactionObject[]) {
    }
}
