import {NgModule} from '@angular/core';
import {ReactionOrderPipe} from './reaction-order/reaction-order.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ReactionOrderPipe
    ],
    providers: [
        ReactionOrderPipe
    ]
})
export class ReactionsModule {
}
