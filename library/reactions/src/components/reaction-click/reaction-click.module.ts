import {NgModule} from '@angular/core';
import {ReactionClassDirective} from '../reaction-class/reaction-class.directive';

@NgModule({
    imports: [Comment],
    declarations: [ReactionClassDirective],
    exports: [ReactionClassDirective]
})
export class ReactionClickModule {
}
