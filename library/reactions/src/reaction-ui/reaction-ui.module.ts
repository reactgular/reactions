import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelDirective} from './reaction-model/reaction-model.directive';
import {ReactionTextComponent} from './reaction-text/reaction-text.component';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
        MatTooltipModule,
        MatButtonModule,
        FontAwesomeModule
    ],
    declarations: [
        ReactionModelDirective,
        ReactionTextComponent
    ],
    exports: [
        ReactionModelDirective,
        ReactionTextComponent
    ]
})
export class ReactionUIModule {
}
