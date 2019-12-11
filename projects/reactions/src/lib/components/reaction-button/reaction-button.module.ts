import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';
import {ReactionTextModule} from '../reaction-text/reaction-text.module';
import {ReactionButtonComponent} from './reaction-button.component';

@NgModule({
    imports: [
        CommonModule,
        ReactionModelModule,
        ReactionTextModule
    ],
    declarations: [
        ReactionButtonComponent
    ],
    exports: [
        ReactionButtonComponent
    ]
})
export class ReactionButtonModule {
}
