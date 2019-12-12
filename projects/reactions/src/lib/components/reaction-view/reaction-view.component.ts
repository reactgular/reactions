import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {mergeAll, pluck} from 'rxjs/operators';
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
    public primary: boolean = true;

    @Input()
    public secondary: boolean = true;

    @Input()
    public text: boolean = true;

    public title$: Observable<string>;

    public constructor(private readonly _reactionProvider: ReactionProvider) {
    }

    public ngOnInit(): void {
        this.title$ = <any>this._reactionProvider.state$.pipe(
            pluck('title'),
            mergeAll()
        );
    }
}
