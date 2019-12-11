import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';
import {ReactionClickDirective} from './reaction-click.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionClickDirective
    ],
    exports: [
        ReactionClickDirective
    ]
})
export class ReactionClickModule {
}
