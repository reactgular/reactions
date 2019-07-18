import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionTooltipDirective} from './reaction-tooltip.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionTooltipDirective],
    exports: [ReactionTooltipDirective]
})
export class ReactionTooltipModule {
}
