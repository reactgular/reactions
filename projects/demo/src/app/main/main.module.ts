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
import {ReactionFontawesomeModule} from '@reactgular/reactions-fontawesome';
import {environment} from '../../environments/environment';
import {MainRoutingModule} from './main-routing.module';
import {BodyComponent} from './body/body.component';
import {ButtonExamplesComponent} from './button-examples/button-examples.component';
import {OutletMainComponent} from './outlet-main/outlet-main.component';

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
        MainRoutingModule,
        LoggerModule.forRoot({enabled: !environment.production}),
        ...REACTION_MODULES,
        ...MAT_MODULES,
        FontAwesomeModule,
        ReactionFontawesomeModule
    ],
    declarations: [
        BodyComponent,
        ButtonExamplesComponent,
        OutletMainComponent
    ],
    bootstrap: [
        BodyComponent
    ]
})
export class MainModule {
}
