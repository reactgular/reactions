import {toReactionValue} from './reaction-value';
import {isObservable, of} from 'rxjs';
import {syncToArray} from '../../tests/observable.helper';
import createSpy = jasmine.createSpy;

describe(toReactionValue.name, () => {
    const values = [
        [1, 2, 3, 4],
        1,
        'house',
        true,
        false,
        null,
        {},
        {a: 1}
    ];

    it('should create observable for value', () => {
        values.forEach(value => {
            const $ = toReactionValue(value);
            expect(isObservable($)).toBeTruthy();
            expect(syncToArray($)).toEqual([value]);
        });
    });

    it('should return passed observable', () => {
        values.forEach(value => {
            const $1 = of(value);
            const $2 = toReactionValue($1);
            expect(isObservable($2)).toBeTruthy();
            expect($2).toBe($1);
            expect(syncToArray($2)).toEqual([value]);
        });
    });

    it('should call function and create observable for value', () => {
        values.forEach(value => {
            const spy = createSpy().and.returnValue(value);
            const $2 = toReactionValue(spy);
            expect(isObservable($2)).toBeTruthy();
            expect(syncToArray($2)).toEqual([value]);
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it('should call function and return observable from function', () => {
        values.forEach(value => {
            const $1 = of(value);
            const spy = createSpy().and.returnValue($1);
            const $2 = toReactionValue(spy);
            expect(isObservable($2)).toBeTruthy();
            expect($2).toBe($1);
            expect(syncToArray($2)).toEqual([value]);
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it('should call functions recursively', () => {
        values.forEach(value => {
            const spy1 = createSpy().and.returnValue(value);
            const spy2 = createSpy().and.returnValue(spy1);
            const spy3 = createSpy().and.returnValue(spy2);
            const $2 = toReactionValue(spy3);
            expect(isObservable($2)).toBeTruthy();
            expect(syncToArray($2)).toEqual([value]);
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
        });
    });
});
