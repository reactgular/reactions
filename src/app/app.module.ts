import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactionsModule} from '../../library/reactions/src/reactions.module';
import {DemoComponent} from './demo/demo.component';
import {DemoEditorComponent} from './demo-editor/demo-editor.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ReactionsModule,
        MatButtonModule
    ],
    declarations: [
        DemoComponent,
        DemoEditorComponent
    ],
    providers: [],
    bootstrap: [
        DemoComponent
    ]
})
export class AppModule {
}
