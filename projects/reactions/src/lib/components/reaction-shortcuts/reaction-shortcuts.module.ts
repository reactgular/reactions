import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionShortcutsDirective} from './reaction-shortcuts.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionShortcutsDirective],
    exports: [ReactionShortcutsDirective]
})
export class ReactionShortcutsModule {
}
