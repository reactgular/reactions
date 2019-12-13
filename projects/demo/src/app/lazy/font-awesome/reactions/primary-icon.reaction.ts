import {faHome} from '@fortawesome/free-solid-svg-icons';
import {Reaction} from '@reactgular/reactions';
import {IconReaction} from './icon.reaction';

@Reaction({
    title: 'Primary Icon',
    tooltip: 'Shows the primary icon only.',
    order: 'demo:000'
})
export class PrimaryIconReaction extends IconReaction {
}
