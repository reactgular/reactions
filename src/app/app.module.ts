import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DemoComponent} from './demo/demo.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        DemoComponent
    ],
    providers: [],
    bootstrap: [
        DemoComponent
    ]
})
export class AppModule {
}
