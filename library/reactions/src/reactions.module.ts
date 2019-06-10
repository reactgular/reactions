import {NgModule} from '@angular/core';
import {ReactiveOrderPipe} from './reactive-order/reactive-order.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ReactiveOrderPipe
    ],
    providers: [
        ReactiveOrderPipe
    ]
})
export class ReactionsModule {
}
