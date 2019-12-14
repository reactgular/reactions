import {removeSpaces} from './remove-spaces';

describe(removeSpaces.name, () => {
    it('should remove spaces around HTML nodes', () => {
        expect(removeSpaces(`
                <span></span>
                <span> inner </span>
            `)).toEqual('<span></span><span> inner </span>');
    });
});
