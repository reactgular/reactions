import {reactionCodeSource} from './reaction-code-source';
import {ReactionCodeTypeEnum} from './reaction-code-tokenizer';

describe(reactionCodeSource.name, () => {
    it('should assume title case words are keyboard codes', () => {
        ['Escape', 'Backspace', 'Delete'].map(value => expect(reactionCodeSource([
            {type: ReactionCodeTypeEnum.LITERAL, value}
        ])).toBe('document', value));
    });

    it('should assume lowercase words are elements', () => {
        ['click', 'dblclick', 'mouseover', 'blur'].map(value => expect(reactionCodeSource([
            {type: ReactionCodeTypeEnum.LITERAL, value}
        ])).toBe('element', value));
    });
});
