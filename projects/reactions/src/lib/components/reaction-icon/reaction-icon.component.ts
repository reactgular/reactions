import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {withSwitchMap} from '@reactgular/observables';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ReactionState} from '../../core/reaction-state/public-api';
import {ReactionProvider} from '../../services/reaction-provider/reaction-provider';
import {ReactionTemplatesService} from '../../services/reaction-templates/reaction-templates.service';

@Component({
    selector: 'rg-reaction-icon',
    templateUrl: './reaction-icon.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionIconComponent implements OnInit {
    public context$: Observable<{ $implicit: any, secondary: boolean }>;

    public template$: Observable<TemplateRef<any>>;

    private readonly _secondary$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public constructor(private readonly _reactionProvider: ReactionProvider,
                       private readonly _reactionTemplates: ReactionTemplatesService) {
    }

    @Input()
    public set secondary(value: boolean) {
        this._secondary$.next(value);
    }

    public ngOnInit(): void {
        this.template$ = this._secondary$.pipe(
            switchMap(secondary => secondary ? this._reactionTemplates.secondary$ : this._reactionTemplates.primary$)
        );

        this.context$ = this._secondary$.pipe(
            withSwitchMap(() => this._reactionProvider.state$),
            withSwitchMap(([secondary, state]: [boolean, ReactionState]) => {
                return secondary ? state.secondary : state.primary;
            }),
            map(([values, $implicit]) => ({$implicit, secondary: values[0]}))
        );
    }
}
