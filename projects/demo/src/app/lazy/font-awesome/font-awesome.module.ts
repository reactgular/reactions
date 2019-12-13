import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FontAwesomeRoutingModule} from './font-awesome-routing.module';
import { OutletFontAwesomeComponent } from './outlet-font-awesome/outlet-font-awesome.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeRoutingModule
    ],
    declarations: [OutletFontAwesomeComponent]
})
export class FontAwesomeModule {
}
