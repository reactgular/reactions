import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionModelDirective} from './reaction-model.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionModelDirective],
    exports: [ReactionModelDirective]
})
export class ReactionModelModule {
}
