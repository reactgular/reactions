import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionClickDirective} from './reaction-click.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionClickDirective],
    exports: [ReactionClickDirective]
})
export class ReactionClickModule {
}
