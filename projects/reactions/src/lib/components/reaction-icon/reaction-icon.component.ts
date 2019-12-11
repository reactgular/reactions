import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionProvider} from '../../services/reaction-provider/reaction-provider';

@Component({
    selector: 'rg-reaction-icon',
    templateUrl: './reaction-icon.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionIconComponent implements OnInit {
    @Input()
    public fixedWidth: boolean = true;

    @Input()
    public secondary: boolean = false;

    public snapshot$: Observable<ReactionSnapshot>;

    public constructor(private readonly _reactionProvider: ReactionProvider) {
    }

    public ngOnInit(): void {
        this.snapshot$ = this._reactionProvider.snapshot$;
    }
}
