import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DemoComponent} from './demo/demo.component';
import {ReactionEditorComponent} from './reaction-editor/reaction-editor.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
    declarations: [
        DemoComponent,
        ReactionEditorComponent
    ],
    providers: [],
    bootstrap: [
        DemoComponent
    ]
})
export class AppModule {
}
