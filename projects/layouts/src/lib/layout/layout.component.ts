import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LayoutOptions} from './layout.types';

const DEFAULT_LAYOUT_OPTIONS: LayoutOptions = {
    topAboveLeft: true,
    topAboveRight: true,
    bottomUnderLeft: false,
    bottomUnderRight: false
};

@Component({
    selector: 'rg-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
    @Input()
    public bottom: TemplateRef<any>;

    @Input()
    public left: TemplateRef<any>;

    public options$: Observable<LayoutOptions>;

    @Input()
    public right: TemplateRef<any>;

    @Input()
    public scrollable: boolean = true;

    @Input()
    public top: TemplateRef<any>;

    private readonly _options$: BehaviorSubject<LayoutOptions> = new BehaviorSubject<LayoutOptions>(DEFAULT_LAYOUT_OPTIONS);

    @Input()
    public set options(options: LayoutOptions) {
        this._options$.next(options);
    }

    public ngOnInit(): void {
        this.options$ = this._options$.pipe(

        );
    }
}
