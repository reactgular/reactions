import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionTextComponent} from './reaction-text.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactionModelModule
    ],
    declarations: [
        ReactionTextComponent
    ],
    exports: [
        ReactionTextComponent,
        ReactionModelModule
    ]
})
export class ReactionTextModule {
}
