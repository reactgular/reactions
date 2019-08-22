/**
 * Material Angular button types.
 */
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
