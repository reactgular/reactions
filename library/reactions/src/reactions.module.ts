import {NgModule} from '@angular/core';
import {ReactionUIModule} from './reaction-ui/reaction-ui.module';

@NgModule({
    imports: [
        ReactionUIModule
    ],
    exports: [
        ReactionUIModule
    ]
})
export class ReactionsModule {
}
