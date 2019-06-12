import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionButtonComponent} from './reaction-button/reaction-button.component';
import {ReactionIconComponent} from './reaction-icon/reaction-icon.component';
import {ReactionMenuItemComponent} from './reaction-menu-item/reaction-menu-item.component';
import {ReactionModelDirective} from './reaction-model/reaction-model.directive';
import {ReactionOrderPipe} from './reaction-order/reaction-order.pipe';
import {ReactionSnapshotPipe} from './reaction-snapshot/reaction-snapshot.pipe';
import {ReactionStyleDirective} from './reaction-style/reaction-style.directive';
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
        ReactionButtonComponent,
        ReactionIconComponent,
        ReactionMenuItemComponent,
        ReactionModelDirective,
        ReactionOrderPipe,
        ReactionSnapshotPipe,
        ReactionStyleDirective,
        ReactionTextComponent
    ],
    providers: [
        ReactionOrderPipe,
        ReactionSnapshotPipe
    ],
    exports: [
        ReactionButtonComponent,
        ReactionIconComponent,
        ReactionMenuItemComponent,
        ReactionModelDirective,
        ReactionOrderPipe,
        ReactionSnapshotPipe,
        ReactionStyleDirective,
        ReactionTextComponent
    ]
})
export class ReactionsModule {
}
