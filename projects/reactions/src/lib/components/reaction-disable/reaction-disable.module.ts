import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';
import {ReactionDisableDirective} from './reaction-disable.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionDisableDirective
    ],
    exports: [
        ReactionDisableDirective
    ]
})
export class ReactionDisableModule {
}
