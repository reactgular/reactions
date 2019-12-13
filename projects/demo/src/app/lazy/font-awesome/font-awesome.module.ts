import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCheckboxModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {FontAwesomeModule as IconModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelModule, ReactionShortcutsModule, ReactionViewModule} from '@reactgular/reactions';
import {ReactionFontawesomeModule} from '@reactgular/reactions-fontawesome';
import {FontAwesomeRoutingModule} from './font-awesome-routing.module';
import {OutletFontAwesomeComponent} from './outlet-font-awesome/outlet-font-awesome.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeRoutingModule,
        MatCheckboxModule,
        ReactionFontawesomeModule,
        ReactionShortcutsModule,
        ReactionModelModule,
        ReactionViewModule,
        MatFormFieldModule,
        MatSelectModule,
        IconModule
    ],
    declarations: [OutletFontAwesomeComponent]
})
export class FontAwesomeModule {
}
