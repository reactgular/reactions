import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {toReactionSnapshots, ReactionSnapshots} from '../reaction-snapshots/reaction-snapshots';
import {Reaction} from '../reaction/reaction';

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
    public set reaction(r: Reaction) {
        this.snapshot$ = toReactionSnapshots(r);
    }
}
