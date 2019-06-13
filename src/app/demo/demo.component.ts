import {ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ReactionCoreService} from '../../../library/reactions/src/reaction-core/reaction-core.service';
import {ReactionProxy} from '../reaction-proxy/reaction-proxy';

@Component({
    selector: 'rg-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit, OnDestroy {
    /**
     * Reaction being edited.
     */
    public proxy: ReactionProxy;

    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(private _reactionCore: ReactionCoreService,
                       private _injector: Injector) {

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
        this.proxy = new ReactionProxy({order: 'A:001'}, this._injector);

        this._reactionCore.events$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(event => console.log(event));
    }
}
