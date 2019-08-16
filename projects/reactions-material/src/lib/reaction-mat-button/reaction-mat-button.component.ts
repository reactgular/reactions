import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'rg-mat-button',
    templateUrl: './reaction-mat-button.component.html',
    styleUrls: ['./reaction-mat-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionMatButtonComponent implements OnInit {
    @Input()
    public type: string = 'button';

    @Input()
    public reaction: unknown;

    public ngOnInit() {
    }
}
