import {fromEvent, merge, Observable} from 'rxjs';
import {throttleTimeIf} from '../../utils/observables';
import {tap} from 'rxjs/operators';
import {ReactionEventBinding} from '../reaction-types';

/**
 * Creates an observable that emits DOM events given a collection of reaction bindings.
 */
export function reactionEventObservable(target: any, hooks: ReactionEventBinding[]): Observable<Event> {
    const events$ = hooks
        .map(({event, debounce}) =>
            fromEvent<Event>(target, event.type).pipe(throttleTimeIf(Boolean(debounce), debounce))
        );
    return merge<Event>(...events$).pipe(
        tap(event => event.preventDefault())
    );
}
