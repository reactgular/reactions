import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerModule} from '@reactgular/logger';
import {ReactionClassModule, ReactionClickModule, ReactionShortcutsModule, ReactionTextModule} from '@reactgular/reactions';
import {ReactionMatButtonModule} from '@reactgular/reactions-material';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {ButtonsExampleComponent} from './buttons-example/buttons-example.component';
import {DemoComponent} from './demo/demo.component';

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
        AppRoutingModule,
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
        ButtonsExampleComponent
    ],
    providers: [],
    bootstrap: [
        DemoComponent
    ]
})
export class AppModule {
}
