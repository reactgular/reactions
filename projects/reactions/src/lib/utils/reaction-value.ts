import {toObservable} from '@reactgular/observables';
import {Observable, of} from 'rxjs';

/**
 * Converts the value to an observable. If the value is a function it is called recursively until a literal or observable
 * is returned.
 */
export function toReactionValue<TType>(value: any, _default: TType = undefined): Observable<TType> {
    if (value === undefined) {
        return of(_default);
    }
    if (typeof value === 'function') {
        return toReactionValue(value(), _default);
    }
    return toObservable(value);
}
