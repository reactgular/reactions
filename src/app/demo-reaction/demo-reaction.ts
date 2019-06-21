import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReactionConfig} from '../../../library/reactions/src/reaction-config/reaction-config';
import {ReactionHook} from '../../../library/reactions/src/reaction-hook/reaction-hook';
import {ReactionEvent} from '../../../library/reactions/src/reaction-events/reaction-event';
import {ReactionSnapshots} from '../../../library/reactions/src/reaction-snapshots/reaction-snapshots';
import {ReactionIcon, ReactionIconAnimate} from '../../../library/reactions/src/reaction-types/reaction-icon';
import {ReactionStyle} from '../../../library/reactions/src/reaction-types/reaction-style';
import {ReactionTooltip} from '../../../library/reactions/src/reaction-types/reaction-tooltip';
import {ReactionBase} from '../../../library/reactions/src/reaction-base/reaction-base';
import {ReactionCoreService} from '../../../library/reactions/src/reaction-core/reaction-core.service';
import {DemoStateService} from '../demo-state/demo-state.service';

/**
 * Emits reaction values from the internal snapshot.
 *
 * @todo This should be injectable and provided via the demo component.
 */
export class DemoReaction extends ReactionBase implements ReactionStyle, ReactionIcon, ReactionTooltip {
    /**
     * The state of the reaction.
     */
    private readonly _snapshot$: Observable<ReactionSnapshots>;

    /**
     * Constructor
     */
    public constructor(config: ReactionConfig,
                       core: ReactionCoreService,
                       state: DemoStateService) {
        super(config, core);
        this._snapshot$ = state.snapshot$;
    }

    public animate(): Observable<ReactionIconAnimate> | ReactionIconAnimate {
        return undefined;
    }

    public css(): Observable<string | string[] | void> {
        return this._snapshot$.pipe(map(snapshot => snapshot.css));
    }

    // @ReactionShortcut('CTRL+M', 'A test shortcut')
    // public example1(event: ReactionEvent) {
    //     console.error('ONE!');
    // }

    @ReactionHook('click')
    public example2(event: ReactionEvent) {
        console.log(event);
    }

    /**
     * Gets the icon state
     */
    public icon(): Observable<string> {
        return this._snapshot$.pipe(map(snapshot => snapshot.icon));
    }

    public secondary(): Observable<string> | string {
        return undefined;
    }

    public secondaryAnimate(): Observable<ReactionIconAnimate> | ReactionIconAnimate {
        return undefined;
    }

    /**
     * Gets the title state
     */
    public title(): Observable<string> {
        return this._snapshot$.pipe(map(snapshot => snapshot.title));
    }

    /**
     * Gets the tool tip state.
     */
    public tooltip(): Observable<string> {
        return this._snapshot$.pipe(map(snapshot => snapshot.tooltip));
    }
}
