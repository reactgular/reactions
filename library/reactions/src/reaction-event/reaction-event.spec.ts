import {ReactionEvent} from './reaction-event';
import {Reaction} from '../reaction/reaction';

describe(ReactionEvent.name, () => {
    it('should hydrate a reaction', () => {
        @Reaction({title: 'Create', description: 'Creates a new document'})
        class CreateReaction {

        }

        const reaction = new CreateReaction();
        const event = new ReactionEvent(0, 'click', reaction, null);

        expect(event.reaction).toBe(reaction);
        expect(reaction['title']).toBe('Create');
        expect(reaction['description']).toBe('Creates a new document');
    });
});
