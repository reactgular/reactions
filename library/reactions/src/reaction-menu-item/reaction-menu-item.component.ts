import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {createSnapshot, ReactionSnapshot} from '../reaction-snapshot/reaction-snapshot';
import {Reaction} from '../reaction/reaction';

@Component({
    selector: 'rg-reaction-menu-item',
    templateUrl: './reaction-menu-item.component.html',
    styleUrls: ['./reaction-menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionMenuItemComponent {
    @Input()
    public icon = true;

    @Input()
    public muted: boolean;

    public snapshot$: Observable<ReactionSnapshot>;

    @Input()
    public title = true;

    @Input()
    public set reaction(r: Reaction) {
        this.snapshot$ = createSnapshot(r);
    }
}
