import {Reaction, ReactionEvent} from '@reactgular/reactions';
import {LogService} from '@reactgular/logger';

@Reaction({
    title: 'Delete',
    tooltip: 'Deletes a note',
    icon: 'fa-trash'
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
