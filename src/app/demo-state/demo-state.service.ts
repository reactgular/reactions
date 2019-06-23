import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DemoModel} from './demo-model';
import {DemoCard} from './demo-card';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {LogService} from '@reactgular/logger';

@Injectable({providedIn: 'root'})
export class DemoStateService {
    /**
     * The internal state storage.
     */
    private readonly _state$: BehaviorSubject<DemoModel> = new BehaviorSubject({index: []});

    private readonly _log: LogService;

    public constructor(log: LogService) {
        this._log = log.withPrefix(DemoStateService.name);
    }

    /**
     * Selects a card from the store.
     */
    public card(id: number): Observable<DemoCard> {
        this._log.info('card', {id});
        return this._state$.pipe(
            map(state => state[id]),
            distinctUntilChanged()
        )
    }

    /**
     * Selects the card IDs.
     */
    public cards(): Observable<number[]> {
        this._log.info('cards');
        return this._state$.pipe(
            map(state => state.index),
            distinctUntilChanged()
        );
    }

    /**
     * Adds a card to the store.
     */
    public add(card: DemoCard) {
        this._log.info('add', card);
        const state = this._state$.getValue();
        this._state$.next({
            ...state,
            [card.id]: card,
            index: [...state.index, card.id]
        });
    }

    /**
     * Removes a card from the store.
     */
    public remove(id: number) {
        this._log.info('remove', {id});
        const state = {...this._state$.getValue()};
        delete state[id];
        state.index = state.index.filter(i => i !== id);
        this._state$.next(state);
    }
}
