import {Reaction, reactionMetaData} from './reaction';
import {REACTION_CODE_MODIFIERS} from '../reaction-code-parser/reaction-code-types';
import {ReactionConstructor, ReactionEventBinding, ReactionObject} from './reaction-types';

describe(reactionMetaData.name, () => {
    it('should attach meta data', () => {
        const META_DATA = {a: 'hello'};

        class F1 {
        }

        const F2 = reactionMetaData(F1, META_DATA);
        expect(F1).toBe(F2);
        expect((<ReactionConstructor>F1).__REACTION__).toEqual(META_DATA);
    });
});

describe(Reaction.name, () => {
    it('should decorate the constructor', () => {
        @Reaction({title: 'Create', icon: 'fa-icon', description: 'Creates a new document'})
        class CreateDocument {

        }

        expect((<ReactionConstructor>CreateDocument).__REACTION__)
            .toEqual({
                title: 'Create',
                icon: 'fa-icon',
                description: 'Creates a new document'
            });
    });

    it('should decorate the methods', () => {
        class CreateDocument {
            @Reaction('click')
            click(e) {

            }
        }

        const reaction = new CreateDocument() as ReactionObject;
        expect(reaction.__REACTION__).toEqual([
            {
                source: 'element',
                event: {
                    type: 'click',
                    ...REACTION_CODE_MODIFIERS
                },
                method: reaction.click
            } as ReactionEventBinding
        ])
    });

    it('should define a debounce', () => {
        class CreateDocument {
            @Reaction('mousemove', {debounce: 100})
            move(e) {

            }
        }

        const reaction = new CreateDocument() as ReactionObject;
        expect(reaction.__REACTION__).toEqual([
            {
                source: 'element',
                debounce: 100,
                event: {
                    type: 'mousemove',
                    ...REACTION_CODE_MODIFIERS
                },
                method: reaction.move
            } as ReactionEventBinding
        ]);
    });
});
