import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionsDirective} from './reactions.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionsDirective],
    exports: [ReactionsDirective]
})
export class ReactionsModule {
}
