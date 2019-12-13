import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'rg-outlet-navigation',
    templateUrl: './outlet-navigation.component.html',
    styleUrls: ['./outlet-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutletNavigationComponent {
}
