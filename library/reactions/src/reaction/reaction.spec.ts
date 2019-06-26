import {Reaction, ReactionConstructor, reactionMetaData} from './reaction';

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
        it('should attach meta data to the constructor function', () => {
            const reaction = {icon: 'fa-plus', title: 'Create'};
            const decorator = Reaction(reaction);
            const F1 = x => x;
            const F2 = decorator(F1);
            expect(F2).toBe(F1);
            expect((<ReactionConstructor>F2).__REACTION__).toEqual(reaction);
        });
    });
});
