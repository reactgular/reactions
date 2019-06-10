import {Attribute, ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {MatTooltip} from '@angular/material';
import {Observable} from 'rxjs';
import {reactionConfig} from '../reaction-config/reaction-config';
import {ReactionMouse} from '../reaction-context/reaction-context';
import {createSnapshot, ReactionSnapshot} from '../reaction-snapshot/reaction-snapshot';
import {Reaction} from '../reaction/reaction';

@Component({
    selector: 'rg-reaction-button',
    templateUrl: './reaction-button.component.html',
    styleUrls: ['./reaction-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionButtonComponent {
    @Input()
    public icon = true;

    @ViewChildren(MatTooltip)
    public matTooltips: QueryList<MatTooltip>;

    @Input()
    public muted: boolean;

    public snapshot$: Observable<ReactionSnapshot>;

    @Input()
    public title = true;

    public constructor(private readonly _view: ViewContainerRef,
                       private readonly _el: ElementRef<HTMLElement>,
                       @Attribute('mode') public mode: 'icon' | 'button' | 'menu') {
        this.mode = this.mode || 'icon';
    }

    private _tool: Reaction;

    @Input()
    public set tool(tool: Reaction) {
        this._tool = tool;
        this.snapshot$ = createSnapshot(tool);
    }

    public mouseDown(event: MouseEvent) {
        const config = reactionConfig(this._tool);
        if (config.down) {
            this._tool.trigger(this.getContext(event, 'down'));
        }
    }

    public mouseUp(event: MouseEvent) {
        const config = reactionConfig(this._tool);
        if (config.up) {
            this._tool.trigger(this.getContext(event, 'up'));
        }
    }

    private getContext(event: MouseEvent, when: 'down' | 'up'): ReactionMouse {
        this.matTooltips.forEach(tip => tip.hide());
        return {type: 'mouse', event, el: this._el, view: this._view, when};
    }
}
