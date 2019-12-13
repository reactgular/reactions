import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionFontawesomeComponent} from './reaction-fontawesome.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        ReactionFontawesomeComponent
    ],
    exports: [
        ReactionFontawesomeComponent
    ]
})
export class ReactionFontawesomeModule {
}
