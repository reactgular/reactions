import {Observable} from 'rxjs';
import {first, toArray} from 'rxjs/operators';

/**
 * Assumes that the observable is synchronise and returns all emitted values as an array.
 */
export function syncToArray<TType>($: Observable<TType>): TType[] {
    let value;
    $.pipe(toArray()).subscribe(val => value = val);
    return value;
}

/**
 * Assumes that the observable is synchronise and returns the first emitted value.
 */
export function syncFirst<TType>($: Observable<TType>): TType {
    let value;
    $.pipe(first()).subscribe(val => value = val);
    return value;
}
