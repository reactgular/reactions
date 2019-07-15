import {ReactionKeyboardService} from './reaction-keyboard.service';
import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {syncFirst} from '../../../tests/observable.helper';

describe(ReactionKeyboardService.name, () => {
    let service: ReactionKeyboardService;
    beforeEach(() => service = TestBed.get(ReactionKeyboardService));

    const keys = ['ctrl', 'alt', 'shift', 'meta'];
    const keyToProperty = (key: string) => `${key}$`;
    const keyToObservable = (key: string): Observable<boolean> => service[keyToProperty(key)];
    const dispatchKeyup = (event: KeyboardEventInit) => document.dispatchEvent(new KeyboardEvent('keyup', event));
    const dispatchKeydown = (event: KeyboardEventInit) => document.dispatchEvent(new KeyboardEvent('keydown', event));
    const dispatchBlur = () => window.dispatchEvent(new FocusEvent('blur'));

    describe('stores key state internally', () => {
        keys.forEach(key => {
            it(`should have ${key} state when subscribing`, () => {
                const key$ = keyToObservable(key);
                expect(syncFirst(key$)).toBe(false, 'default is false');
                dispatchKeydown({[key + 'Key']: true});
                expect(syncFirst(key$)).toBe(true);
                dispatchKeyup({[key + 'Key']: false});
                expect(syncFirst(key$)).toBe(false);
            });
        });
    });

    describe('should emit key pressed and released', () => {
        keys.forEach(key => {
            it(`should emit changes for ${key}`, () => {
                const values = [];
                const sub = keyToObservable(key).subscribe(v => values.push(v));
                dispatchKeydown({[key + 'Key']: true});
                dispatchKeyup({[key + 'Key']: false});
                sub.unsubscribe();
                expect(values).toEqual([false, true, false]);
            });
        });
    });

    describe('should emit all keys released on window blur event', () => {
        keys.forEach(key => {
            it(`should emit false for ${key}`, () => {
                const values = [];
                const sub = keyToObservable(key).subscribe(v => values.push(v));
                dispatchKeydown({[key + 'Key']: true});
                dispatchBlur();
                sub.unsubscribe();
                expect(values).toEqual([false, true, false]);
            });
        });
    });

    describe('should not emit keys released on window blur events if key not pressed', () => {
        keys.forEach(key => {
            it(`should emit false for ${key}`, () => {
                const values = [];
                const sub = keyToObservable(key).subscribe(v => values.push(v));
                dispatchBlur();
                sub.unsubscribe();
                expect(values).toEqual([false]);
            });
        });
    });

    it('should emit ESC key pressed', () => {

    });

    it('should emit DELETE key pressed', () => {

    });

    it('should emit ENTER key pressed', () => {

    });

    it('should emit key pressed ignoring case', () => {

    });

    it('should emit key pressed matching case', () => {

    });
});
