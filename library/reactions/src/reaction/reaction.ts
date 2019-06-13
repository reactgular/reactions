import {ReactionTitle} from '../reaction-types/reaction-title';
import {ReactionConfig} from '../reaction-config/reaction-config';
import {Observable} from 'rxjs';
import {Injector} from '@angular/core';
import {ReactionCoreService} from '../reaction-core/reaction-core.service';

export abstract class Reaction implements ReactionTitle {
    public readonly config: Partial<ReactionConfig>;

    protected _reactionCore: ReactionCoreService;

    protected constructor(injector: Injector) {
        this._reactionCore = injector.get(ReactionCoreService);
    }

    public abstract title(): Observable<string> | string;
}
