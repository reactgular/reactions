import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReactionTextOptions} from '../reaction-text/reaction-text-options';
import {
    isReactionMatButtonTypeIcon,
    ReactionMatButtonType,
    ReactionMatButtonTypes,
    ReactionMatButtonValues,
    VALUES_DEFAULT
} from './reaction-mat-button-types';

/**
 * Applies defaults to view values.
 */
export const mapValuesToDefaults = (values: ReactionMatButtonValues): ReactionMatButtonValues => ({
    ...values,
    disableRipple: Boolean(values.disableRipple),
    options: values.options || VALUES_DEFAULT.options,
    type: values.type || VALUES_DEFAULT.type
});

/**
 * Hides text when rendering icon buttons
 */
export const mapIconValues = (values: ReactionMatButtonValues): ReactionMatButtonValues => ({
    ...values,
    options: isReactionMatButtonTypeIcon(values.type) ? {...values.options, hideTitle: true, hideSecondary: true} : values.options
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
export class ReactionMatButtonComponent extends ReactionMatButtonTypes {
    /**
     * View values
     */
    public values$: Observable<ReactionMatButtonValues>;

    /**
     * Emits value changes.
     */
    private readonly _values$: BehaviorSubject<ReactionMatButtonValues> = new BehaviorSubject(VALUES_DEFAULT);

    /**
     * Constructor
     */
    public constructor() {
        super();

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
    public set type(type: ReactionMatButtonType) {
        this._patch({type});
    }

    /**
     * Patches the current view state.
     */
    private _patch(value: Partial<ReactionMatButtonValues>) {
        this._values$.next({...this._values$.getValue(), ...value});
    }
}
