import {faPlug, faTrash} from '@fortawesome/free-solid-svg-icons';
import {LogService} from '@reactgular/logger';
import {Reaction, ReactionEvent} from '@reactgular/reactions';

@Reaction({
    title: 'Delete',
    tooltip: 'Deletes a note',
    icon: faTrash,
    secondary: faPlug,
    disabled: true
})
export class DeleteReaction {
    private readonly _log: LogService;

    public constructor(log: LogService) {
        this._log = log.withPrefix(DeleteReaction.name);
    }

    @Reaction('click')
    public click(event: ReactionEvent) {
        this._log.info({event});
    }
}
