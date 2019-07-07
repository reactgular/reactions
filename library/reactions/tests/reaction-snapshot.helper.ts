import {ReactionSnapshot} from '../src/reaction-snapshots/reaction-snapshot';

export const reactionSnapshotDefaults = () => ({
    description: undefined,
    disabled: false,
    icon: undefined,
    animate: undefined,
    secondary: undefined,
    secondaryAnimate: undefined,
    order: '0',
    css: [],
    title: 'n/a',
    tooltip: undefined,
    visible: true
} as ReactionSnapshot);