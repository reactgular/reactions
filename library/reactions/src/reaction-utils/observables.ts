import {isObservable, MonoTypeOperatorFunction, Observable, of} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, filter, map, withLatestFrom} from 'rxjs/operators';

export function toObservable<TType>(value: TType | Observable<TType>): Observable<TType> {
    return isObservable(value) ? value : of(value);
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
export function disabledWhen<TType>(disabled: Observable<boolean>): MonoTypeOperatorFunction<TType> {
    return (source: Observable<TType>): Observable<TType> => {
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

export function enabledWhen<TType>(enabled: Observable<boolean>): MonoTypeOperatorFunction<TType> {
    return (source: Observable<TType>): Observable<TType> => source.pipe(disabledWhen(enabled.pipe(negate())));
}
