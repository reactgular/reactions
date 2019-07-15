import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelDirective} from './reaction-model/reaction-model.directive';
import {ReactionTextComponent} from './reaction-text/reaction-text.component';
import {ReactionClassDirective} from './reaction-class/reaction-class.directive';
import {ReactionClickDirective} from './reaction-click/reaction-click.directive';
import {ReactionTooltipDirective} from './reaction-tooltip/reaction-tooltip.directive';
import {ReactionSnapshotPipe} from './reaction-snapshots/reaction-snapshot.pipe';

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
        ReactionTextComponent,
        ReactionClassDirective,
        ReactionClickDirective,
        ReactionTooltipDirective,
        ReactionSnapshotPipe
    ],
    exports: [
        ReactionModelDirective,
        ReactionTextComponent,
        ReactionClassDirective,
        ReactionClickDirective
    ]
})
export class ReactionUIModule {
}
