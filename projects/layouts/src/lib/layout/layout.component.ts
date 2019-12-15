import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'rg-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
    @Input()
    public bottom: TemplateRef<any>;

    @Input()
    public left: TemplateRef<any>;

    @Input()
    public right: TemplateRef<any>;

    @Input()
    public scrollable: boolean = true;

    @Input()
    public showBottom: boolean = true;

    @Input()
    public showLeft: boolean = true;

    @Input()
    public showRight: boolean = true;

    @Input()
    public showTop: boolean = true;

    @Input()
    public top: TemplateRef<any>;
}
