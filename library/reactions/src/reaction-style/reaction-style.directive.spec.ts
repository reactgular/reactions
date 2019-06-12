import {ReactionStyleDirective} from './reaction-style.directive';

describe(ReactionStyleDirective.name, () => {
    it('should create an instance', () => {
        const directive = new ReactionStyleDirective(undefined, undefined, undefined);
        expect(directive).toBeTruthy();
    });
});
