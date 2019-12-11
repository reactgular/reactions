import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';
import {ReactionViewComponent} from './reaction-view.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionViewComponent
    ],
    exports: [
        ReactionViewComponent
    ]
})
export class ReactionViewModule {
}
