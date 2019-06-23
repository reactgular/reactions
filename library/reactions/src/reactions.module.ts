import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelDirective} from './reaction-model/reaction-model.directive';
import {ReactionSnapshotPipe} from './reaction-snapshots/reaction-snapshot.pipe';
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
        ReactionSnapshotPipe,
        ReactionTextComponent
    ],
    providers: [
        ReactionSnapshotPipe
    ],
    exports: [
        ReactionModelDirective,
        ReactionSnapshotPipe,
        ReactionTextComponent
    ]
})
export class ReactionsModule {
}
