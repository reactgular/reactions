import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ReactionCoreService} from '../../../library/reactions/src/reaction-core/reaction-core.service';
import {DemoReaction} from '../demo-reaction/demo-reaction';
import {DemoStateService} from '../demo-state/demo-state.service';

@Component({
    selector: 'rg-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
    // @todo provide the proxy here
})
export class DemoComponent implements OnInit, OnDestroy {
    /**
     * Reaction being edited.
     *
     * @todo use injection instead
     */
    public proxy: DemoReaction;

    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(private _reactionCore: ReactionCoreService,
                       private _state: DemoStateService) {

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
        this.proxy = new DemoReaction({order: 'A:001'}, this._reactionCore, this._state);

        this._reactionCore.events$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(event => console.log(event));
    }
}
