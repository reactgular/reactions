import {Attribute, ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {MatTooltip} from '@angular/material';
import {Observable, of} from 'rxjs';
import {reactionConfig} from '../reaction-config/reaction-config';
import {ReactionMouse} from '../reaction-context/reaction-context';
import {Reaction} from '../reaction/reaction';
import {isReactionAnimate, ReactionAnimateMode} from '../reaction/reaction-animate';
import {isReactionDisabled} from '../reaction/reaction-disabled';
import {isReactionStyle, ReactionColor} from '../reaction/reaction-style';
import {isReactionVisible} from '../reaction/reaction-visible';

@Component({
    selector: 'rg-reaction-button',
    templateUrl: './reaction-button.component.html',
    styleUrls: ['./reaction-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionButtonComponent {
    public animate$: Observable<ReactionAnimateMode | void>;

    public color$: Observable<ReactionColor | void>;

    public disabled$: Observable<boolean>;

    public highlight$: Observable<boolean>;

    @Input()
    public icon = true;

    public icon$: Observable<string>;

    @ViewChildren(MatTooltip)
    public matTooltips: QueryList<MatTooltip>;

    @Input()
    public muted: boolean;

    @Input()
    public title = true;

    public title$: Observable<string>;

    public toolTip$: Observable<string>;

    public visible$: Observable<boolean>;

    public constructor(private readonly _view: ViewContainerRef,
                       private readonly _el: ElementRef<HTMLElement>,
                       @Attribute('mode') public mode: 'icon' | 'button' | 'menu') {
        this.mode = this.mode || 'icon';
    }

    private _tool: Reaction;

    @Input()
    public set tool(tool: Reaction) {
        this._tool = tool;
        this.icon$ = tool.icon();
        this.toolTip$ = tool.toolTip();
        this.title$ = tool.title();
        this.animate$ = isReactionAnimate(tool) ? tool.animate() : undefined;
        this.color$ = isReactionStyle(tool) ? tool.color() : undefined;
        this.highlight$ = isReactionStyle(tool) ? tool.highlight() : undefined;
        this.disabled$ = isReactionDisabled(tool) ? tool.disabled() : of(false);
        this.visible$ = isReactionVisible(tool) ? tool.visible() : of(true);
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
