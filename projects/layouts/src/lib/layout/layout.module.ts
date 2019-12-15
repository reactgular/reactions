import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScrollableModule} from '../scrollable/scrollable.module';
import {LayoutComponent} from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        ScrollableModule
    ],
    declarations: [
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {
}
