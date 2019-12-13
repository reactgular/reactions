import {Reaction} from '@reactgular/reactions';
import {IconReaction} from './icon.reaction';

@Reaction({
    title: 'Secondary Icon',
    tooltip: 'Shows the secondary icon only.',
    order: 'demo:001'
})
export class SecondaryIconReaction extends IconReaction {
}
