import {stripComments} from './strip-comments';

describe(stripComments.name, () => {
    it('should not modify HTML without comments', () => {
        expect(stripComments('<html>Something</html>')).toEqual('<html>Something</html>');
    });

    it('should strip comments from HTML', () => {
        expect(stripComments('<html><!-- Exclude me -->Something</html>')).toEqual('<html>Something</html>');
    });
});
