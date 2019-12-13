import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'rg-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent {
}
