import {hydrateInstance, ReactionObject} from '../reaction/reaction';
import {fromEvent, merge, Observable} from 'rxjs';
import {ReactionSnapshot, toReactionSnapshot} from '../reaction-snapshots/reaction-snapshot';
import {ReactionState, toReactionState} from '../reaction-state/reaction-state';
import {ReactionEvent} from '../reaction-event/reaction-event';
import {ElementRef, ViewContainerRef} from '@angular/core';
import {throttleTimeIf} from '../reaction-utils/observables';
import {map, tap} from 'rxjs/operators';

export class ReactionSubscribe {
    /**
     * Constructor
     */
    public constructor(public readonly reaction: ReactionObject,
                       private readonly _disabled$: Observable<boolean>,
                       private readonly _events$: Observable<ReactionEvent>) {
        hydrateInstance(this.reaction);
    }

    private _state: ReactionState;

    /**
     * Reaction as a state object.
     */
    public get state(): ReactionState {
        if (!this._state) {
            this._state = toReactionState(this.reaction);
        }
        return this._state;
    }

    private _snapshot$: Observable<ReactionSnapshot>;

    /**
     * Emits snapshots of the reaction.
     */
    public get snapshot$(): Observable<ReactionSnapshot> {
        if (!this._snapshot$) {
            this._snapshot$ = toReactionSnapshot(this.reaction);
        }
        return this._snapshot$;
    }

    public fromElement(el: ElementRef<HTMLElement>, view: ViewContainerRef): Observable<ReactionEvent> {
        const hooks = this.reaction.__REACTION__;

        const events$ = hooks.map(({eventType, debounce}) => fromEvent<UIEvent>(el.nativeElement, eventType)
            .pipe(throttleTimeIf(Boolean(debounce), debounce)));

        return merge<UIEvent>(...events$).pipe(
            tap(event => event.preventDefault()),
            map<UIEvent, ReactionEvent>(payload => ({id: 0, el, view, payload, reaction: this.reaction})),
        );
    }
}
