import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ReactionProxy} from '../reaction-proxy/reaction-proxy';

@Component({
    selector: 'rg-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {
    /**
     * Reaction being edited.
     */
    public proxy: ReactionProxy;

    /**
     * Initialization
     */
    public ngOnInit(): void {
        this.proxy = new ReactionProxy({order: 'A:001'});
    }
}
