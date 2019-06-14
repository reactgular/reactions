import {isObservable, Observable, of} from 'rxjs';

export function toObservable<TType>(value: TType | Observable<TType>): Observable<TType> {
    return isObservable(value) ? value : of(value);
}
