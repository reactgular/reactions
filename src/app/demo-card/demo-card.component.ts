import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'rg-demo-card',
    templateUrl: './demo-card.component.html',
    styleUrls: ['./demo-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCardComponent {
}
