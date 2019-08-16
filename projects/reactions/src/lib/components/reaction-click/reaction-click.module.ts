import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionClickDirective} from './reaction-click.directive';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionClickDirective
    ],
    exports: [
        ReactionClickDirective,
        ReactionModelModule
    ]
})
export class ReactionClickModule {
}
