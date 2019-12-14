import {createMouseEvent} from './dom-events';

describe(createMouseEvent.name, () => {
    it('should create a custom event', () => {
        const event = createMouseEvent('click');
        expect(event).toBeTruthy();
        expect(event.type).toBe('click');
    });
});
