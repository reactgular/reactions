import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionMatButtonComponent} from './reaction-mat-button.component';
import {MatButtonModule} from '@angular/material';
import {ReactionClassModule, ReactionClickModule, ReactionModelModule, ReactionTextModule} from '@reactgular/reactions';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        ReactionModelModule,
        ReactionClassModule,
        ReactionClickModule,
        ReactionTextModule
    ],
    declarations: [
        ReactionMatButtonComponent
    ],
    exports: [
        ReactionMatButtonComponent
    ]
})
export class ReactionMatButtonModule {
}
