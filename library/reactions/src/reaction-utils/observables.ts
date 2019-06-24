import {isObservable, MonoTypeOperatorFunction, Observable, of, OperatorFunction} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, filter, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

/**
 * Converts the parameter to an observable, or returns the value if already an observable.
 */
export function toObservable<TType>(value: TType | Observable<TType>): Observable<TType> {
    return isObservable(value) ? value : of(value);
}

/**
 * Emits the inner observable value with the outer observable value as a pair array.
 */
export function withSwitchMap<T, R>(inner: Observable<R>): OperatorFunction<T, [T, R]> {
    return (source: Observable<T>): Observable<[T, R]> => {
        return source.pipe(
            switchMap(a => inner.pipe(map(b => [a, b] as [T, R])))
        );
    }
}

/**
 * Emits the inner observable value with the outer observable value as a pair array.
 */
export function withMergeMap<T, R>(inner: Observable<R>): OperatorFunction<T, [T, R]> {
    return (source: Observable<T>): Observable<[T, R]> => {
        return source.pipe(
            mergeMap(a => inner.pipe(map(b => [a, b] as [T, R])))
        );
    }
}

/**
 * Maps values to an inverted boolean.
 */
export function negate(): MonoTypeOperatorFunction<boolean> {
    return (source: Observable<any>): Observable<boolean> => source.pipe(map(val => !val));
}

/**
 * Disables emitting of values while the passed observable emits true.
 */
export function disabledWhen<T>(disabled: Observable<boolean>): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            withLatestFrom(disabled.pipe(
                defaultIfEmpty(false),
                map(Boolean),
                distinctUntilChanged()
            )),
            filter(([value, disabled]) => !disabled),
            map(([value]) => value)
        );
    };
}

/**
 * Enables emitting of values while the passed observable emits true.
 */
export function enabledWhen<TType>(enabled: Observable<boolean>): MonoTypeOperatorFunction<TType> {
    return (source: Observable<TType>): Observable<TType> => source.pipe(disabledWhen(enabled.pipe(negate())));
}
