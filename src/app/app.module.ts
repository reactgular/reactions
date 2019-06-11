import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactionsModule} from '../../library/reactions/src/reactions.module';
import {DemoComponent} from './demo/demo.component';
import {ReactionEditorComponent} from './reaction-editor/reaction-editor.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ReactionsModule
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
