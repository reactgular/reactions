import {NgModule} from '@angular/core';
import {ReactionClassModule} from '../reaction-class/reaction-class.module';
import {ReactionClickModule} from '../reaction-click/reaction-click.module';
import {ReactionDisableModule} from '../reaction-disable/reaction-disable.module';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';

/**
 * Exports all the modules required to use the [reaction] behavior that binds several directives at once to a button.
 */
@NgModule({
    imports: [
        ReactionModelModule,
        ReactionClickModule,
        ReactionClassModule,
        ReactionDisableModule
    ],
    exports: [
        ReactionModelModule,
        ReactionClickModule,
        ReactionClassModule,
        ReactionDisableModule
    ]
})
export class ReactionBehaviorsModule {
}
