import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionButtonComponent} from './reaction-button/reaction-button.component';
import {ReactionOrderPipe} from './reaction-order/reaction-order.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
        MatTooltipModule,
        MatButtonModule,
        FontAwesomeModule
    ],
    declarations: [
        ReactionOrderPipe,
        ReactionButtonComponent
    ],
    providers: [
        ReactionOrderPipe
    ]
})
export class ReactionsModule {
}
