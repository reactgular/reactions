import {ReactionCodeTypeEnum} from '../lib/core/reaction-code-parser/reaction-code-tokenizer';

export const TOKEN_CTRL = {type: ReactionCodeTypeEnum.MODIFIER, value: 'ctrl'};
export const TOKEN_ALT = {type: ReactionCodeTypeEnum.MODIFIER, value: 'alt'};
export const TOKEN_META = {type: ReactionCodeTypeEnum.MODIFIER, value: 'meta'};

export const TOKEN_DOCUMENT = {type: ReactionCodeTypeEnum.SOURCE, value: 'document'};
export const TOKEN_ELEMENT = {type: ReactionCodeTypeEnum.SOURCE, value: 'element'};
