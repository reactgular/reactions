import {ReactionSnapshot} from '../lib/core/reaction-snapshot/reaction-snapshot';

export const reactionSnapshotDefaults = () => ({
    description: undefined,
    disabled: false,
    primary: undefined,
    animate: undefined,
    secondary: undefined,
    secondaryAnimate: undefined,
    order: 0,
    group: 0,
    css: [],
    title: '',
    tooltip: undefined,
    visible: true
} as ReactionSnapshot);
