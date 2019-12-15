import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LayoutOptions} from '@reactgular/layouts';
import {Stateful} from '@reactgular/stateful';
import {Observable} from 'rxjs';

@Component({
    selector: 'rg-outlet-navigation',
    templateUrl: './outlet-navigation.component.html',
    styleUrls: ['./outlet-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutletNavigationComponent implements OnInit {
    public options$: Observable<LayoutOptions>;

    public state: Stateful<LayoutOptions> = new Stateful<LayoutOptions>({});

    public toggles: Array<keyof LayoutOptions> = [
        'topAboveLeft',
        'topAboveRight',
        'bottomUnderLeft',
        'bottomUnderRight'
    ];

    public ngOnInit(): void {
        this.options$ = this.state.state$;
    }

    public toggleOverlay(key: keyof LayoutOptions) {
        const snapshot = this.state.snapshot();
        this.state.patch({[key]: !snapshot[key]});
    }
}
