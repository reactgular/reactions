import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {ReactionClassModule} from '../reaction-class/reaction-class.module';
import {ReactionClickModule} from '../reaction-click/reaction-click.module';
import {ReactionModelModule} from '../reaction-model/reaction-model.module';
import {ReactionTextModule} from '../reaction-text/reaction-text.module';
import {ReactionMatButtonComponent} from './reaction-mat-button.component';

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
