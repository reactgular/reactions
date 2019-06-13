import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelDirective} from './reaction-model/reaction-model.directive';
import {ReactionOrderPipe} from './reaction-order/reaction-order.pipe';
import {ReactionSnapshotsPipe} from './reaction-snapshots/reaction-snapshots.pipe';
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
        ReactionOrderPipe,
        ReactionSnapshotsPipe,
        ReactionTextComponent
    ],
    providers: [
        ReactionOrderPipe,
        ReactionSnapshotsPipe
    ],
    exports: [
        ReactionModelDirective,
        ReactionOrderPipe,
        ReactionSnapshotsPipe,
        ReactionTextComponent
    ]
})
export class ReactionsModule {
}
