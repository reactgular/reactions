import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionClassDirective} from './reaction-class.directive';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionClassDirective
    ],
    exports: [
        ReactionClassDirective,
        ReactionModelModule
    ]
})
export class ReactionClassModule {
}
