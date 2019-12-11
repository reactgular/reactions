import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {ReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionTextOptions} from './reaction-text-options';

/**
 * Displays the body of a reaction control. Mostly the icon and title.
 */
@Component({
    selector: 'rg-reaction-text',
    templateUrl: './reaction-text.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionTextComponent {
    /**
     * What should be shown in the template.
     */
    @Input()
    public options?: ReactionTextOptions;

    /**
     * Snapshot of the reaction
     */
    @Input()
    public snapshot: ReactionSnapshot;
}
