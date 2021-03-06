import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactionIconModule} from '../reaction-icon/reaction-icon.module';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';
import {ReactionViewComponent} from './reaction-view.component';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule,
        ReactionIconModule
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
