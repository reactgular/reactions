import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionTooltipDirective} from './reaction-tooltip.directive';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionTooltipDirective
    ],
    exports: [
        ReactionTooltipDirective,
        ReactionModelModule
    ]
})
export class ReactionTooltipModule {
}
