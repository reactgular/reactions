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

const MAT_MODULES = [
    MatButtonModule
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        LoggerModule.forRoot({enabled: !environment.production}),
        ReactionShortcutsModule,
        ReactionClassModule,
        ReactionClickModule,
        ReactionTextModule,
        ...MAT_MODULES
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
