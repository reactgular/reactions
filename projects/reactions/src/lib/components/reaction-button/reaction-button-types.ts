/**
 * Material Angular button types.
 */

export enum ReactionButtonType {
    BASIC = 'basic',
    FLAT = 'flat',
    RAISED = 'raised',
    STROKED = 'stroked',
    ICON = 'icon',
    FAB = 'fab',
    MINI_FAB = 'mini-fab'
}

/**
 * The different types of buttons.
 */
export const REACTION_BUTTON_TYPES: ReactionButtonType[] = [
    ReactionButtonType.BASIC,
    ReactionButtonType.FLAT,
    ReactionButtonType.RAISED,
    ReactionButtonType.STROKED,
    ReactionButtonType.ICON,
    ReactionButtonType.FAB,
    ReactionButtonType.MINI_FAB
];
/**
 * Indicates if the button type should render only an icon.
 */
export const isReactionButtonTypeIcon = (type: ReactionButtonType): boolean =>
    type === ReactionButtonType.ICON || type === ReactionButtonType.FAB || type === ReactionButtonType.MINI_FAB;

