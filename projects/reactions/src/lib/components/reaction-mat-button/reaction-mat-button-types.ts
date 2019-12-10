/**
 * Material Angular button types.
 */
import {ThemePalette} from '@angular/material';
import {Observable, of} from 'rxjs';
import {ReactionTextOptions} from '../reaction-text/reaction-text-options';

export enum ReactionMatButtonType {
    BASIC = 'basic',
    FLAT = 'flat',
    RAISED = 'raised',
    STROKED = 'stroked',
    ICON = 'icon',
    FAB = 'fab',
    MINI_FAB = 'mini-fab'
}

/**
 * Exposes button types as component properties that can be used in the view.
 */
export class ReactionMatButtonTypes {
    public BASIC = ReactionMatButtonType.BASIC;

    public FAB = ReactionMatButtonType.FAB;

    public FLAT = ReactionMatButtonType.FLAT;

    public ICON = ReactionMatButtonType.ICON;

    public MINI_FAB = ReactionMatButtonType.MINI_FAB;

    public RAISED = ReactionMatButtonType.RAISED;

    public STROKED = ReactionMatButtonType.STROKED;
}

/**
 * The different types of buttons.
 */
export const REACTION_MAT_BUTTON_TYPES: ReactionMatButtonType[] = [
    ReactionMatButtonType.BASIC,
    ReactionMatButtonType.FLAT,
    ReactionMatButtonType.RAISED,
    ReactionMatButtonType.STROKED,
    ReactionMatButtonType.ICON,
    ReactionMatButtonType.FAB,
    ReactionMatButtonType.MINI_FAB
];
/**
 * Indicates if the button type should render only an icon.
 */
export const isReactionMatButtonTypeIcon = (type: ReactionMatButtonType): boolean =>
    type === ReactionMatButtonType.ICON || type === ReactionMatButtonType.FAB || type === ReactionMatButtonType.MINI_FAB;

export interface ReactionMatButtonValues {
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
    type: ReactionMatButtonType;
}

export const VALUES_DEFAULT: ReactionMatButtonValues = {
    color: undefined,
    disableRipple: false,
    disabled$: of(false),
    options: {},
    reaction: undefined,
    type: ReactionMatButtonType.BASIC
};
