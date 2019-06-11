import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReactionSnapshot} from '../reaction-snapshot/reaction-snapshot';

@Component({
    selector: 'rg-reaction-label',
    templateUrl: './reaction-label.component.html',
    styleUrls: ['./reaction-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionLabelComponent {
    @Input()
    public icon: boolean;

    @Input()
    public snapshot: ReactionSnapshot;

    @Input()
    public title: boolean;
}
