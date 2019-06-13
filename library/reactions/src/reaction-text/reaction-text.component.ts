import {ChangeDetectionStrategy, Component, Input, OnInit, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {assertReactionModel, ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ReactionSnapshots} from '../reaction-snapshots/reaction-snapshots';

/**
 * Displays the body of a reaction control. Mostly the icon and title.
 */
@Component({
    selector: 'rg-reaction-text',
    templateUrl: './reaction-text.component.html',
    styleUrls: ['./reaction-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionTextComponent implements OnInit {
    /***
     * Show the icon
     */
    @Input()
    public icon: boolean = true;

    /**
     * Show the secondary icon
     */
    @Input()
    public secondary: boolean = true;

    /**
     * Emits snapshots of the reaction
     */
    public snapshot$: Observable<ReactionSnapshots>;

    /**
     * Show the title
     */
    @Input()
    public title: boolean = true;

    /**
     * Constructor
     */
    public constructor(@Optional() private _reactionModel: ReactionModelDirective) {
        assertReactionModel('rg-reaction-text', _reactionModel);
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        this.snapshot$ = this._reactionModel.snapshot$;
    }
}
