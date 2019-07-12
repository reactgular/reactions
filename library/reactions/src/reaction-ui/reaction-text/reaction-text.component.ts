import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReactionSnapshot} from '../../reaction-engine/reaction-snapshots/reaction-snapshot';

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
    /***
     * Show the icon
     */
    @Input()
    public icon: boolean = true;

    /**
     * Show the secondary icon
     */
    @Input()
    public secondary: boolean = true;

    /**
     * Snapshot of the reaction
     */
    @Input()
    public snapshot: ReactionSnapshot;

    /**
     * Show the title
     */
    @Input()
    public title: boolean = true;
}