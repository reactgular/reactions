import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionStatePipe} from './reaction-state.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionStatePipe],
    exports: [ReactionStatePipe]
})
export class ReactionStateModule {
}
