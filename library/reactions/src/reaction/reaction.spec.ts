import {Reaction, ReactionConstructor, ReactionEventBinding, reactionMetaData, ReactionObject} from './reaction';
import {REACTION_KEY_MODIFIERS} from '../reaction-key-modifiers/reaction-key-modifiers';

describe('reaction', () => {
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
                    type: 'click',
                    modifiers: REACTION_KEY_MODIFIERS,
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
                    debounce: 100,
                    type: 'mousemove',
                    modifiers: REACTION_KEY_MODIFIERS,
                    method: reaction.move
                } as ReactionEventBinding
            ]);
        });
    });
});
