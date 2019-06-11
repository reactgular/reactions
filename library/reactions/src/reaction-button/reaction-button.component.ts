import {ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {MatTooltip} from '@angular/material';
import {Observable} from 'rxjs';
import {createSnapshot, ReactionSnapshot} from '../reaction-snapshot/reaction-snapshot';
import {Reaction} from '../reaction/reaction';

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

    public snapshot$: Observable<ReactionSnapshot>;

    @Input()
    public title = true;

    @Input()
    public type: string;

    public constructor(private readonly _view: ViewContainerRef,
                       private readonly _el: ElementRef<HTMLElement>) {
    }

    @Input()
    public set reaction(reaction: Reaction) {
        this.snapshot$ = createSnapshot(reaction);
    }
}
