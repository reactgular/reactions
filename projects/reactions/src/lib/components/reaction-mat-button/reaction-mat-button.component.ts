import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReactionTextOptions} from '../reaction-text/reaction-text-options';
import {isReactionButtonTypeIcon, ReactionButtonType} from './reaction-mat-button-types';

interface ReactionButtonValues {
    /**
     * Material color.
     */
    color: ThemePalette;

    /**
     * Whether ripples are disabled.
     */
    disableRipple: boolean;

    /**
     * Emits when the button is disabled
     */
    disabled$: Observable<boolean>;

    /**
     * Options for rendering the text.
     */
    options: ReactionTextOptions;

    /**
     * The reaction object that will handle the behavior of the button.
     */
    reaction: unknown;

    /**
     * Controls which style of Material button to render.
     */
    type: ReactionButtonType;
}

const REACTION_BUTTON_VALUES_DEFAULT: ReactionButtonValues = {
    color: undefined,
    disableRipple: false,
    disabled$: of(false),
    options: {},
    reaction: undefined,
    type: ReactionButtonType.BASIC
};
/**
 * Applies defaults to view values.
 */
const mapValuesToDefaults = (values: ReactionButtonValues): ReactionButtonValues => ({
    ...values,
    disableRipple: Boolean(values.disableRipple),
    options: values.options || REACTION_BUTTON_VALUES_DEFAULT.options,
    type: values.type || REACTION_BUTTON_VALUES_DEFAULT.type
});

/**
 * Hides text when rendering icon buttons
 */
const mapIconValues = (values: ReactionButtonValues): ReactionButtonValues => ({
    ...values,
    options: isReactionButtonTypeIcon(values.type) ? {...values.options, hideTitle: true, hideSecondary: true} : values.options
});

/**
 * Renders an Angular Material button bound to a Reactions object.
 */
@Component({
    selector: 'rg-mat-button',
    templateUrl: './reaction-mat-button.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionMatButtonComponent {
    public BASIC = ReactionButtonType.BASIC;

    public FAB = ReactionButtonType.FAB;

    public FLAT = ReactionButtonType.FLAT;

    public ICON = ReactionButtonType.ICON;

    public MINI_FAB = ReactionButtonType.MINI_FAB;

    public RAISED = ReactionButtonType.RAISED;

    public STROKED = ReactionButtonType.STROKED;

    /**
     * View values
     */
    public values$: Observable<ReactionButtonValues>;

    /**
     * Emits value changes.
     */
    private readonly _values$: BehaviorSubject<ReactionButtonValues> = new BehaviorSubject(REACTION_BUTTON_VALUES_DEFAULT);

    /**
     * Constructor
     */
    public constructor() {
        this.values$ = this._values$.pipe(
            map(mapValuesToDefaults),
            map(mapIconValues)
        );
    }

    /**
     * Material color.
     */
    @Input()
    public set color(color: ThemePalette) {
        this._patch({color});
    }

    /**
     * Whether ripples are disabled.
     */
    @Input()
    public set disableRipple(disableRipple: boolean) {
        this._patch({disableRipple});
    }

    /**
     * Options for rendering the text.
     */
    @Input()
    public set options(options: ReactionTextOptions) {
        this._patch({options});
    }

    /**
     * The reaction object that will handle the behavior of the button.
     */
    @Input()
    public set reaction(reaction: unknown) {
        this._patch({reaction});
    }

    /**
     * Controls which style of Material button to render.
     */
    @Input()
    public set type(type: ReactionButtonType) {
        this._patch({type});
    }

    /**
     * Patches the current view state.
     */
    private _patch(value: Partial<ReactionButtonValues>) {
        this._values$.next({...this._values$.getValue(), ...value});
    }
}
