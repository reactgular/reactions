import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoComponent} from './demo/demo.component';
import {DemoCardComponent} from './demo-card/demo-card.component';
import {LoggerModule} from '@reactgular/logger';
import {environment} from '../environments/environment';
import {ReactionClassModule, ReactionClickModule, ReactionShortcutsModule, ReactionTextModule} from '@reactgular/reactions';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        LoggerModule.forRoot({enabled: !environment.production}),
        ReactionShortcutsModule,
        ReactionClassModule,
        ReactionClickModule,
        ReactionTextModule
    ],
    declarations: [
        DemoComponent,
        DemoCardComponent
    ],
    providers: [],
    bootstrap: [
        DemoComponent
    ]
})
export class AppModule {
}
