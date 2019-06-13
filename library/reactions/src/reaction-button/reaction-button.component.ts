import {ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {MatTooltip} from '@angular/material';
import {Observable} from 'rxjs';
import {toReactionSnapshots, ReactionSnapshots} from '../reaction-snapshots/reaction-snapshots';
import {ReactionTitle} from '../reaction-types/reaction-title';

@Component({
    selector: 'rg-reaction-button',
    templateUrl: './reaction-button.component.html',
    styleUrls: ['./reaction-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionButtonComponent {
    @Input()
    public icon = true;

    @ViewChildren(MatTooltip)
    public matTooltips: QueryList<MatTooltip>;

    @Input()
    public muted: boolean;

    public snapshot$: Observable<ReactionSnapshots>;

    @Input()
    public title = true;

    @Input()
    public type: string;

    public constructor(private readonly _view: ViewContainerRef,
                       private readonly _el: ElementRef<HTMLElement>) {
    }

    @Input()
    public set reaction(reaction: ReactionTitle) {
        this.snapshot$ = toReactionSnapshots(reaction);
    }
}
