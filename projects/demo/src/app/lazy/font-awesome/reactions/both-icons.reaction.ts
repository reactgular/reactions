import {Reaction} from '@reactgular/reactions';
import {IconReaction} from './icon.reaction';

@Reaction({
    title: 'Both Icons',
    tooltip: 'Shows both icons',
    order: 'demo:002'
})
export class BothIconsReaction extends IconReaction {
}
