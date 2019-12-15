import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'rg-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundComponent {
}
