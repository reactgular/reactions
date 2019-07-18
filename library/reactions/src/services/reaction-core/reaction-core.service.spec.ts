import {TestBed} from '@angular/core/testing';
import {ReactionCoreService} from './reaction-core.service';
import {ReactionEvent} from '../../core/reaction-event/reaction-event';
import {REACTION_CODE_MODIFIERS} from '../../core/reaction-code-parser/reaction-code-types';
import {ReactionObject} from '../../core/reaction/reaction-types';

describe(ReactionCoreService.name, () => {
    describe('events', () => {
        it('should increment an internal ID', () => {
            const service: ReactionCoreService = TestBed.get(ReactionCoreService);
            expect(service.nextId).toBe(1);
            for (let i = 0; i < 10; i++) {
                service.broadcast({}, 'click', null);
            }
            expect(service.nextId).toBe(11);
        });

        it('should emit events with increasing ID', () => {
            const service: ReactionCoreService = TestBed.get(ReactionCoreService);
            const events: ReactionEvent[] = [];
            service.events$.subscribe(e => events.push(e));
            for (let i = 0; i < 5; i++) {
                service.broadcast({}, 'click', null);
            }
            const IDs = events.map(e => e.id);
            expect(IDs).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('hooks', () => {
        it('should emit event objects', () => {

        });

        it('should execute hook method', () => {
            const service: ReactionCoreService = TestBed.get(ReactionCoreService);

            // @todo makes this a decorated class at the top of the file.
            const reaction: ReactionObject = {
                __REACTION__: [
                    {
                        type: 'click',
                        modifiers: REACTION_CODE_MODIFIERS,
                        method: (event) => console.error(event)
                    }
                ]
            };

            service.broadcast(reaction, 'click', null);
        });
    });
});
