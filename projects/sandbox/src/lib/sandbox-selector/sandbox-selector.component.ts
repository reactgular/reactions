import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'rg-sandbox-selector',
    templateUrl: './sandbox-selector.component.html',
    styleUrls: ['./sandbox-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxSelectorComponent {
}
