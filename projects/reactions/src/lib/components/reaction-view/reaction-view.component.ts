import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactionSnapshot} from '../../core/reaction-snapshot/reaction-snapshot';
import {ReactionProvider} from '../../services/reaction-provider/reaction-provider';

/**
 * Displays the body of a reaction control. Mostly the icon and title.
 */
@Component({
    selector: 'rg-reaction-view',
    templateUrl: './reaction-view.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionViewComponent implements OnInit {
    @Input()
    public fixedWidth: boolean = true;

    @Input()
    public icon: boolean = true;

    @Input()
    public secondary: boolean = true;

    public snapshot$: Observable<ReactionSnapshot>;

    @Input()
    public text: boolean = true;

    public constructor(private readonly _reactionProvider: ReactionProvider) {
    }

    public ngOnInit(): void {
        this.snapshot$ = this._reactionProvider.snapshot$;
    }
}
