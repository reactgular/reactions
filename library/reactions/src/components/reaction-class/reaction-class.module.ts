import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionClassDirective} from './reaction-class.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionClassDirective],
    exports: [ReactionClassDirective]
})
export class ReactionClassModule {
}
