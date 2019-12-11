import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';
import {ReactionClassDirective} from './reaction-class.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionClassDirective
    ],
    exports: [
        ReactionClassDirective
    ]
})
export class ReactionClassModule {
}
