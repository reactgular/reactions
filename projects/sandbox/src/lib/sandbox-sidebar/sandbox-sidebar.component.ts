import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'rg-sandbox-sidebar',
    templateUrl: './sandbox-sidebar.component.html',
    styleUrls: ['./sandbox-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxSidebarComponent {
}
