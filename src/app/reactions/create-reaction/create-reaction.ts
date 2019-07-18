import {ReactionEvent} from '../../../../library/reactions/src/core/reaction-event/reaction-event';
import {LogService} from '@reactgular/logger';
import {Reaction} from '../../../../library/reactions/src/core/reaction/reaction';

@Reaction({
    title: 'Create',
    tooltip: 'Creates a new note',
    icon: 'fa-plus',
    order: 'demo:000'
})
export class CreateReaction {
    private readonly _log: LogService;

    public constructor(log: LogService) {
        this._log = log.withPrefix(CreateReaction.name);
    }

    @Reaction('click')
    public click(event: ReactionEvent) {
        this._log.info('click', event);
    }
}
