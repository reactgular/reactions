import {reactionEventMatcher} from './reaction-event-matcher';
import {createClickEvent} from '../../../tests/dom-events.helper';

describe(reactionEventMatcher.name, () => {
    it('should match the event type', () => {
        expect(reactionEventMatcher(createClickEvent(), {type: 'click'})).toBeTruthy();
    });

    it('should match keyboard modifiers', () => {
        expect(reactionEventMatcher(createClickEvent({ctrlKey: true}), {type: 'click', ctrlKey: true})).toBeTruthy();
        expect(reactionEventMatcher(createClickEvent(), {type: 'click', ctrlKey: false})).toBeTruthy();
    });
});
