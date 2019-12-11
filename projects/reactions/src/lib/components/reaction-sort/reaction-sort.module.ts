import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionSortPipe} from './reaction-sort.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionSortPipe],
    exports: [ReactionSortPipe]
})
export class ReactionSortModule {
}
