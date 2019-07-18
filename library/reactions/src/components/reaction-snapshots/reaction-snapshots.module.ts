import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactionSnapshotsPipe} from './reaction-snapshots.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ReactionSnapshotsPipe],
    exports: [ReactionSnapshotsPipe]
})
export class ReactionSnapshotsModule {
}
