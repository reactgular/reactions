import {isObservable, Observable, of} from 'rxjs';
import {syncToArray} from '../../tests/observable.helper';
import {toObservable} from './observables';

describe(toObservable.name, () => {
    it('should create observable for literal values', () => {
        const $ = toObservable('house');
        expect(isObservable($)).toBeTruthy();
        expect(syncToArray($)).toEqual(['house']);
    });

    it('should not modify an observable', () => {
        const $1 = of('house');
        const $2 = toObservable($1);
        expect($2).toBe($1);
    });

    it('should emit undefined', () => {
        const $ = toObservable(undefined);
        expect(isObservable($)).toBeTruthy();
        expect(syncToArray($)).toEqual([undefined]);
    });

    it('should emit an array', () => {
        const $: Observable<number[]> = toObservable([1, 2, 3, 4]);
        expect(isObservable($)).toBeTruthy();
        expect(syncToArray($)).toEqual([[1, 2, 3, 4]]);
    });
});
