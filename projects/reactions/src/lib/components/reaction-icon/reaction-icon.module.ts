import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionIconComponent} from './reaction-icon.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        ReactionIconComponent
    ],
    exports: [
        ReactionIconComponent
    ]
})
export class ReactionIconModule {
}
