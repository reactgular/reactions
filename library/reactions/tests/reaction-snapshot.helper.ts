import {ReactionSnapshot} from '../src/reaction-engine/reaction-snapshot/reaction-snapshot';

export const reactionSnapshotDefaults = () => ({
    description: undefined,
    disabled: false,
    icon: undefined,
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
