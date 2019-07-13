import {ReactionSnapshot} from '../src/reaction-engine/reaction-snapshots/reaction-snapshot';

export const reactionSnapshotDefaults = () => ({
    description: undefined,
    disabled: false,
    icon: undefined,
    animate: undefined,
    secondary: undefined,
    secondaryAnimate: undefined,
    order: '0',
    css: [],
    title: '',
    tooltip: undefined,
    visible: true
} as ReactionSnapshot);
