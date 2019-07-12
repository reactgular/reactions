import {hydrateReaction} from './hydrate-reaction';
import {Reaction} from '../reaction-engine/reaction/reaction';
import {ReactionConstructor, ReactionObject} from '../reaction-engine/reaction/reaction-types';

describe(hydrateReaction.name, () => {
    it('should copy properties from constructor decorator', () => {
        @Reaction({title: 'Create', description: 'Creates a document'})
        class CreateDocument {

        }

        const R2 = hydrateReaction(new CreateDocument());
        expect(R2['title']).toBe('Create');
        expect(R2['description']).toBe('Creates a document');
    });

    it('should not replace existing properties', () => {
        @Reaction({title: 'Create', description: 'Creates a document'})
        class NewDocument {
            title: string = 'New'
        }

        const R2 = hydrateReaction(new NewDocument());
        expect(R2['title']).toBe('New');
        expect(R2['description']).toBe('Creates a document');
    });

    it('should remove the constructor decorator', () => {
        @Reaction({title: 'Create', description: 'Creates a document'})
        class CreateDocument {

        }

        const R1 = new CreateDocument();
        expect((<ReactionConstructor>R1.constructor).__REACTION__).toBeTruthy();
        const R2 = hydrateReaction(R1);
        expect((<ReactionConstructor>R2.constructor).__REACTION__).toBeUndefined();
    });

    it('should assign an empty hooks array', () => {
        @Reaction({title: 'Create', description: 'Creates a document'})
        class CreateDocument {

        }

        const R1 = new CreateDocument();
        expect((<ReactionObject>R1).__REACTION__).toBeUndefined();
        const R2 = hydrateReaction(R1);
        expect((<ReactionObject>R2).__REACTION__).toEqual([]);
    });

    it('should return the same instance', () => {
        @Reaction({title: 'Create', description: 'Creates a document'})
        class CreateDocument {

        }

        const R1 = new CreateDocument();
        const R2 = hydrateReaction(R1);
        expect(R2).toBe(R1);
    });
});
