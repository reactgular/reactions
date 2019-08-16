import {reactionCodeValidator} from './reaction-code-validator';
import {TOKEN_CTRL, TOKEN_DOCUMENT, TOKEN_ELEMENT} from '../../../tests/reaction-code-token.helper';
import {ReactionCodeTypeEnum} from './reaction-code-tokenizer';

const EMPTY_ERROR = 'Reaction code is empty.';
const INVALID_ERROR = 'Invalid reaction code';

describe(reactionCodeValidator.name, () => {
    it('should throw an error for empty tokens collection', () => {
        expect(() => reactionCodeValidator([])).toThrowError(EMPTY_ERROR);
    });

    it('should throw an error if no literal value', () => {
        expect(() => reactionCodeValidator([TOKEN_CTRL])).toThrowError(INVALID_ERROR);
        expect(() => reactionCodeValidator([TOKEN_CTRL, TOKEN_DOCUMENT])).toThrowError(INVALID_ERROR);
        expect(() => reactionCodeValidator([TOKEN_ELEMENT])).toThrowError(INVALID_ERROR);
    });

    it('should not throw an error for valid tokens', () => {
        const l = (value) => ({type: ReactionCodeTypeEnum.LITERAL, value});
        expect(() => reactionCodeValidator([TOKEN_CTRL, l('m')])).not.toThrow();
        expect(() => reactionCodeValidator([TOKEN_DOCUMENT, TOKEN_CTRL, l('Special')])).not.toThrow();
        expect(() => reactionCodeValidator([l('click')])).not.toThrow();
    });
});
