import {isObservable} from 'rxjs';
import {syncToArray} from './observable.helper';

/**
 * Compares an object that has observables as properties against another object of expected values using the list of required keys.
 *
 * Each observable must emit a single value.
 */
export function reactionObjectEquals(keys: string[], expected: any, actual: any = {}) {
    return () => {
        keys.forEach(key => {
            expect(expected.hasOwnProperty(key)).toBeTruthy();
            expect(isObservable(expected[key])).toBeTruthy();
            expect(syncToArray(expected[key])).toEqual([actual[key]]);
        });
    };
}
