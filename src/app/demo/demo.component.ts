import {ChangeDetectionStrategy, Component, Inject, InjectionToken, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CreateReaction} from '../reactions/create-reaction/create-reaction';
import {LogService} from '@reactgular/logger';
import {ReactionCoreService} from '@reactgular/reactions';

export const TOP_BAR_TOKEN: InjectionToken<any> = new InjectionToken<any>('TOP_BAR_TOKEN');

@Component({
    selector: 'rg-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: TOP_BAR_TOKEN, useClass: CreateReaction, multi: true}
    ]
})
export class DemoComponent implements OnInit, OnDestroy {
    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Logger
     */
    private readonly _log: LogService;

    /**
     * Constructor
     */
    public constructor(@Inject(TOP_BAR_TOKEN) public reactions: unknown[],
                       private _reactionCore: ReactionCoreService,
                       log: LogService) {
        this._log = log.withPrefix(DemoComponent.name);
        this._log.info({reactions});
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
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
