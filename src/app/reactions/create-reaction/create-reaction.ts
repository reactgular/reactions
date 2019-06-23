import {Observable} from 'rxjs';
import {ReactionHook} from '../../../../library/reactions/src/reaction-hook/reaction-hook';
import {ReactionEvent} from '../../../../library/reactions/src/reaction-events/reaction-event';
import {ReactionIcon} from '../../../../library/reactions/src/reaction-types/reaction-icon';
import {Reaction} from '../../../../library/reactions/src/reaction/reaction';
import {ReactionTitle} from '../../../../library/reactions/src/reaction-types/reaction-title';
import {LogService} from '@reactgular/logger';

@Reaction({order: 'demo:000'})
export class CreateReaction implements ReactionTitle, ReactionIcon {
    private readonly _log: LogService;

    public constructor(log: LogService) {
        this._log = log.withPrefix(CreateReaction.name);
        this._log.info('constructor');
    }

    @ReactionHook('click')
    public click(event: ReactionEvent) {
        this._log.info('click', event);
    }

    /**
     * Gets the icon state
     */
    public icon(): Observable<string> | string {
        return 'fa-plus';
    }

    /**
     * Gets the title state
     */
    public title(): Observable<string> | string {
        return 'Create';
    }
}
