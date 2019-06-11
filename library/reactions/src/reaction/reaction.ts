import {Observable} from 'rxjs';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {ReactionContext} from '../reaction-context/reaction-context';

export interface Reaction {
    /**
     * Configuration options for the tool.
     */
    readonly config?: Partial<ReactionConfig>;

    /**
     * The visual icon for the tool.
     */
    icon(): Observable<string>;

    /**
     * The title shown in the body of a button or menu item.
     */
    title(): Observable<string>;

    /**
     * The tooltip shown when mouse hovering.
     */
    toolTip(): Observable<string>;

    /**
     * Triggers the tool on the down event (mouse down, .
     */
    trigger(context?: ReactionContext);
}

