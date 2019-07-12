import {NgModule} from '@angular/core';
import {ReactionUIModule} from './reaction-ui/reaction-ui.module';
import {ReactionEngineModule} from './reaction-engine/reaction-engine.module';

@NgModule({
    imports: [
        ReactionUIModule,
        ReactionEngineModule
    ],
    exports: [
        ReactionUIModule,
        ReactionEngineModule
    ]
})
export class ReactionsModule {
}
