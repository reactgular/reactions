import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoggerModule} from '@reactgular/logger';
import {
    ReactionClassModule,
    ReactionClickModule,
    ReactionModelModule,
    ReactionShortcutsModule,
    ReactionTemplatesModule,
    ReactionViewModule
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
    ReactionModelModule,
    ReactionClickModule,
    ReactionClassModule,
    ReactionShortcutsModule,
    ReactionViewModule,
    ReactionTemplatesModule
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
        FontAwesomeModule
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
