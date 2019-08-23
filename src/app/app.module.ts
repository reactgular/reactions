import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoComponent} from './demo/demo.component';
import {DemoCardComponent} from './demo-card/demo-card.component';
import {LoggerModule} from '@reactgular/logger';
import {environment} from '../environments/environment';
import {ReactionClassModule, ReactionClickModule, ReactionShortcutsModule, ReactionTextModule} from '@reactgular/reactions';
import {ReactionMatButtonModule} from '@reactgular/reactions-material';
import { ButtonsExampleComponent } from './buttons-example/buttons-example.component';

const MAT_MODULES = [
    MatButtonModule
];

const REACTION_MODULES = [
    ReactionShortcutsModule,
    ReactionClassModule,
    ReactionClickModule,
    ReactionTextModule,
    ReactionMatButtonModule,
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        LoggerModule.forRoot({enabled: !environment.production}),
        ...REACTION_MODULES,
        ...MAT_MODULES,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule
    ],
    declarations: [
        DemoComponent,
        DemoCardComponent,
        ButtonsExampleComponent
    ],
    providers: [],
    bootstrap: [
        DemoComponent
    ]
})
export class AppModule {
}
