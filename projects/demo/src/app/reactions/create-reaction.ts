import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {LogService} from '@reactgular/logger';
import {Reaction, ReactionEvent} from '@reactgular/reactions';

@Reaction({
    title: 'Create',
    tooltip: 'Creates a new note',
    icon: faPlus,
    order: 'demo:000'
})
export class CreateReaction {
    private readonly _log: LogService;

    public constructor(log: LogService) {
        this._log = log.withPrefix(CreateReaction.name);
    }

    @Reaction('click, ctrl+n')
    public click(event: ReactionEvent) {
        this._log.info({event});
    }
}
