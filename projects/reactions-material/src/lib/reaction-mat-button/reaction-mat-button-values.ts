import {ThemePalette} from '@angular/material';
import {ReactionTextOptions} from '@reactgular/reactions/lib/components/reaction-text/reaction-text-options';
import {ReactionMatButtonType} from '../reaction-materials.type';

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
    options: {},
    reaction: undefined,
    type: ReactionMatButtonType.BASIC
};
