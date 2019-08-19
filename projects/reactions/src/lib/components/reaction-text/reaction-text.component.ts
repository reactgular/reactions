import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionTestOptions} from './reaction-test-options';

/**
 * Displays the body of a reaction control. Mostly the icon and title.
 */
@Component({
    selector: 'rg-reaction-text',
    templateUrl: './reaction-text.component.html',
    styleUrls: ['./reaction-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionTextComponent {
    /**
     * What should be shown in the template.
     */
    @Input()
    public options?: ReactionTestOptions;

    /**
     * Snapshot of the reaction
     */
    @Input()
    public snapshot: ReactionSnapshot;
}
