import {isObservable} from 'rxjs';
import {syncToArray} from './observable.helper';

export function reactionObjectEquals(keys: string[], expected: any, actual: any = {}) {
    return () => {
        keys.forEach(key => {
            expect(expected.hasOwnProperty(key)).toBeTruthy();
            expect(isObservable(expected[key])).toBeTruthy();
            expect(syncToArray(expected[key])).toEqual([actual[key]]);
        });
    };
}
