import {ChangeDetectionStrategy, Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {Destroyable} from '@reactgular/destroyable';
import {LogService} from '@reactgular/logger';
import {ReactionCoreService, ReactionObject} from '@reactgular/reactions';
import {takeUntil} from 'rxjs/operators';
import {CreateReaction} from '../reactions/create-reaction';
import {DeleteReaction} from '../reactions/delete-reaction';
import {EditReaction} from '../reactions/edit-reaction';

export const TOP_BAR_TOKEN: InjectionToken<any> = new InjectionToken<any>('TOP_BAR_TOKEN');

@Component({
    selector: 'rg-outlet-main',
    templateUrl: './outlet-main.component.html',
    styleUrls: ['./outlet-main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: TOP_BAR_TOKEN, useClass: CreateReaction, multi: true},
        {provide: TOP_BAR_TOKEN, useClass: EditReaction, multi: true},
        {provide: TOP_BAR_TOKEN, useClass: DeleteReaction, multi: true}
    ]
})
export class OutletMainComponent extends Destroyable implements OnInit {
    /**
     * Logger
     */
    private readonly _log: LogService;

    /**
     * Constructor
     */
    public constructor(@Inject(TOP_BAR_TOKEN) public reactions: ReactionObject[],
                       private _reactionCore: ReactionCoreService,
                       log: LogService) {
        super();
        this._log = log.withPrefix(OutletMainComponent.name);
    }

    /**
     * Initialization
     */
    public ngOnInit(): void {
        this._reactionCore.events$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(event => this._log.info({event}));
    }
}
