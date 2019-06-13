import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {toReactionSnapshots, ReactionSnapshots} from '../reaction-snapshots/reaction-snapshots';
import {ReactionTitle} from '../reaction-types/reaction-title';

@Component({
    selector: 'rg-reaction-icon',
    templateUrl: './reaction-icon.component.html',
    styleUrls: ['./reaction-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionIconComponent {
    @Input()
    public muted: boolean;

    public snapshot$: Observable<ReactionSnapshots>;

    public constructor(private readonly _view: ViewContainerRef,
                       private readonly _el: ElementRef<HTMLElement>) {
    }

    @Input()
    public set reaction(r: ReactionTitle) {
        this.snapshot$ = toReactionSnapshots(r);
    }
}
