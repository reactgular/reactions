import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerModule} from '@reactgular/logger';
import {
    ReactionButtonModule,
    ReactionClassModule,
    ReactionClickModule,
    ReactionShortcutsModule,
    ReactionTextModule
} from '@reactgular/reactions';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {ButtonExamplesComponent} from './button-examples/button-examples.component';
import {DemoComponent} from './demo/demo.component';

const MAT_MODULES = [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
];

const REACTION_MODULES = [
    ReactionButtonModule,
    ReactionClassModule,
    ReactionClickModule,
    ReactionShortcutsModule,
    ReactionTextModule,
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        LoggerModule.forRoot({enabled: !environment.production}),
        ...REACTION_MODULES,
        ...MAT_MODULES,
    ],
    declarations: [
        DemoComponent,
        ButtonExamplesComponent
    ],
    bootstrap: [
        DemoComponent
    ]
})
export class AppModule {
}
