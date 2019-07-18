import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionTextComponent} from './reaction-text.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [ReactionTextComponent],
    exports: [ReactionTextComponent]
})
export class ReactionTextModule {
}
