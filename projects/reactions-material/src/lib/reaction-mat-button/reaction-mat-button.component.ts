import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {ReactionTestOptions} from '@reactgular/reactions';
import {ReactionMatButtonType} from '../reaction-materials.type';
import {ReactionMatButtonTypes} from './reaction-mat-button-types';

/**
 * Renders an Angular Material button bound to a Reactions object.
 */
@Component({
    selector: 'rg-mat-button',
    templateUrl: './reaction-mat-button.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionMatButtonComponent extends ReactionMatButtonTypes implements OnInit {
    /**
     * Material color.
     */
    @Input()
    public color?: ThemePalette;

    /**
     * Whether ripples are disabled.
     */
    @Input()
    public disableRipple?: boolean;

    /**
     * Options for rendering the text.
     */
    @Input()
    public options?: ReactionTestOptions;

    /**
     * The reaction object that will handle the behavior of the button.
     */
    @Input()
    public reaction: unknown;

    /**
     * Controls which style of Material button to render.
     */
    @Input()
    public type: ReactionMatButtonType = ReactionMatButtonType.BASIC;

    /**
     * Initializer
     */
    public ngOnInit() {
    }
}
