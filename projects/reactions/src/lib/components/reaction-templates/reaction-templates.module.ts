import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { ReactionTemplatesDirective } from './reaction-templates.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ReactionTemplatesDirective
    ],
    declarations: [ReactionTemplatesDirective]
})
export class ReactionTemplatesModule {
}
