import {Observable} from 'rxjs';
import {first, toArray} from 'rxjs/operators';

/**
 * Assumes that the observable is synchronise and returns all emitted values as an array.
 *
 * @deprecated Use marbles instead.
 */
export function syncToArray<TType>($: Observable<TType>): TType[] {
    let value = undefined;
    $.pipe(toArray()).subscribe(val => value = val);
    return value;
}

/**
 * Assumes that the observable is synchronise and returns the first emitted value.
 *
 * @deprecated Use marbles instead.
 */
export function syncFirst<TType>($: Observable<TType>): TType {
    let value = undefined;
    let emitted = false;
    $.pipe(first()).subscribe(val => {
        value = val;
        emitted = true;
    });
    if (!emitted) {
        throw new Error('Observable did not emit a value');
    }
    return value;
}

/**
 * Collects emitted values when the callback is executed.
 *
 * @deprecated Use marbles instead.
 */
export function syncCapture<TType>($: Observable<TType>, cb: () => void): TType[] {
    let value = [];
    const sub = $.subscribe(val => value.push(val));
    cb();
    sub.unsubscribe();
    return value;
}

/**
 * Returns the first emitted value when the callback is executed.
 *
 * @deprecated Use marbles instead.
 */
export function syncCaptureFirst<TType>($: Observable<TType>, cb: () => void): TType {
    let value = undefined;
    let emitted = false;
    const sub = $.pipe(first()).subscribe(val => {
        value = val;
        emitted = true;
    });
    cb();
    sub.unsubscribe();
    if (!emitted) {
        throw new Error('Observable did not emit a value');
    }
    return value;
}
