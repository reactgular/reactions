import {combineEvents} from './combine-events';
import {ElementRef} from '@angular/core';
import {fakeAsync, flush, tick} from '@angular/core/testing';

describe(combineEvents.name, () => {
    it('should call preventDefault on events', () => {
        const event = {
            preventDefault: jasmine.createSpy('preventDefault')
        };

        const el = {
            addEventListener: jasmine.createSpy('addEventListener').and.callFake((e: string, cb: (any) => void) => cb(event)),
            removeEventListener: jasmine.createSpy('removeEventListener')
        } as any as HTMLElement;

        const events = [];
        const s = combineEvents(new ElementRef(el), [{
            source: 'element',
            event: {type: 'click'},
            method: x => (x)
        }]).subscribe(e => events.push(e));
        s.unsubscribe();

        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
        expect(events).toEqual([event]);
    });

    it('should throttle emitted events', fakeAsync(() => {
        const el = {
            addEventListener: jasmine.createSpy('addEventListener').and.callFake((e: string, cb: (any) => void) => {
                // emit immediately
                cb(new CustomEvent('build', {detail: 1}));
                // this should be skipped
                setTimeout(() => cb(new CustomEvent('build', {detail: 2})), 500);
                // this will emit
                setTimeout(() => cb(new CustomEvent('build', {detail: 3})), 1000)
            }),
            removeEventListener: jasmine.createSpy('removeEventListener')
        } as any as HTMLElement;

        const events: CustomEvent[] = [];
        const s = combineEvents(new ElementRef(el), [{
            debounce: 1000,
            source: 'element',
            event: {type: 'click'},
            method: x => (x)
        }]).subscribe((e: any) => events.push(e));

        expect(events.length).toBe(1);
        tick(750);
        expect(events.length).toBe(1);
        flush();
        expect(events.length).toBe(2);

        s.unsubscribe();

        expect(events.map(e => e.detail)).toEqual([1, 3]);
    }));
});
