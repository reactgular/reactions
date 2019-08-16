import {TestBed} from '@angular/core/testing';
import {ReactionCoreService} from './reaction-core.service';
import {ReactionEvent} from '../../core/reaction-event/reaction-event';
import {Reaction} from '../../core/reaction/reaction';
import {ReactionObject} from '../../core/reaction-types';
import {createClickEvent} from '../../../tests/dom-events.helper';

class TestReaction implements ReactionObject {
    public events: ReactionEvent[] = [];

    @Reaction('click')
    public click(event: ReactionEvent) {
        this.events.push(event);
    }
}

describe(ReactionCoreService.name, () => {
    describe('events', () => {
        it('should increment an internal ID', () => {
            const service: ReactionCoreService = TestBed.get(ReactionCoreService);
            expect(service.nextId).toBe(1);
            for (let i = 0; i < 10; i++) {
                service.broadcast({}, createClickEvent(), null, null, null);
            }
            expect(service.nextId).toBe(11);
        });

        it('should emit events with increasing ID', () => {
            const service: ReactionCoreService = TestBed.get(ReactionCoreService);
            const events: ReactionEvent[] = [];
            service.events$.subscribe(e => events.push(e));
            for (let i = 0; i < 5; i++) {
                service.broadcast({}, createClickEvent(), null, null, null);
            }
            const IDs = events.map(e => e.id);
            expect(IDs).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('hooks', () => {
        it('should emit event objects', () => {
            const service: ReactionCoreService = TestBed.get(ReactionCoreService);
            const reaction = new TestReaction();
            service.broadcast(reaction, createClickEvent(), null, null, null);
            expect(reaction.events.length).toBe(1);
            const event = reaction.events[0];
            expect(event instanceof ReactionEvent).toBeTruthy('should emit event object');
        });
    });
});
