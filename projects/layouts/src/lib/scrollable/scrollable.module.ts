import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScrollableComponent} from './scrollable.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ScrollableComponent
    ],
    exports: [
        ScrollableComponent
    ]
})
export class ScrollableModule {
}
