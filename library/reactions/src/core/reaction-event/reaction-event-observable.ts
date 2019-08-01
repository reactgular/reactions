import {fromEvent, merge, Observable} from 'rxjs';
import {throttleTimeIf} from '../../utils/observables';
import {tap} from 'rxjs/operators';
import {ReactionEventBinding} from '../reaction-types';
import {FromEventTarget} from 'rxjs/src/internal/observable/fromEvent';

/**
 * Creates an observable that emits DOM events given a collection of reaction bindings.
 */
export function reactionEventObservable(target: FromEventTarget<Event>, hooks: ReactionEventBinding[]): Observable<Event> {
    const events$ = hooks
        .map(({event, debounce}) =>
            fromEvent<Event>(target, event.type).pipe(throttleTimeIf(Boolean(debounce), debounce))
        );
    return merge<UIEvent>(...events$).pipe(
        tap(event => event.preventDefault())
    );
}
