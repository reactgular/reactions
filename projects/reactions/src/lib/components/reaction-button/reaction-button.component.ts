import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {ReactionTextOptions} from '../reaction-text/reaction-text-options';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[rgReactionButton]',
    templateUrl: './reaction-button.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionButtonComponent {
    @Input()
    public options?: ReactionTextOptions;

    // tslint:disable-next-line:no-input-rename
    @Input('rgReactionButton')
    public reaction: unknown;
}
