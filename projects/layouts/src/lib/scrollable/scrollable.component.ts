import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'rg-scrollable, [rgScrollable]',
    template: `
        <div class="rg-overflow"
             [class.rg-horizontal]="horizontal === true || horizontal === 'both'"
             [class.rg-vertical]="horizontal === false || horizontal === 'both'">
            <ng-content></ng-content>
        </div>`,
    styleUrls: ['./scrollable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollableComponent {
    @Input()
    public horizontal: boolean | 'both' = false;
}
