import {ReactionSnapshot} from '../lib/core/reaction-snapshot/reaction-snapshot';

export const reactionSnapshotDefaults = () => (<ReactionSnapshot>{
    description: undefined,
    disabled: false,
    primary: undefined,
    secondary: undefined,
    order: 0,
    group: 0,
    css: [],
    title: '',
    tooltip: undefined,
    visible: true
});
