import {Observable} from 'rxjs';
import {first, toArray} from 'rxjs/operators';

/**
 * Assumes that the observable is synchronise and returns all emitted values as an array.
 */
export function syncToArray<TType>($: Observable<TType>): TType[] {
    let value = undefined;
    $.pipe(toArray()).subscribe(val => value = val);
    return value;
}

/**
 * Assumes that the observable is synchronise and returns the first emitted value.
 */
export function syncFirst<TType>($: Observable<TType>): TType {
    let value = undefined;
    $.pipe(first()).subscribe(val => value = val);
    return value;
}

export function syncCapture<TType>($: Observable<TType>, cb: () => void): TType[] {
    let value = undefined;
    const sub = $.subscribe(val => value = val);
    cb();
    sub.unsubscribe();
    return value;
}
