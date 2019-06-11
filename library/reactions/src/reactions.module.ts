import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionButtonComponent} from './reaction-button/reaction-button.component';
import {ReactionOrderPipe} from './reaction-order/reaction-order.pipe';
import {ReactionIconComponent} from './reaction-icon/reaction-icon.component';
import {ReactionLabelComponent} from './reaction-label/reaction-label.component';
import { ReactionMenuItemComponent } from './reaction-menu-item/reaction-menu-item.component';

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
        ReactionButtonComponent,
        ReactionIconComponent,
        ReactionLabelComponent,
        ReactionMenuItemComponent
    ],
    providers: [
        ReactionOrderPipe
    ],
    exports: [
        ReactionButtonComponent,
        ReactionIconComponent
    ]
})
export class ReactionsModule {
}
