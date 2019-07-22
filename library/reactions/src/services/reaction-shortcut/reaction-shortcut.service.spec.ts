import {TestBed} from '@angular/core/testing';
import {ReactionShortcutService} from './reaction-shortcut.service';
import {REACTION_CODE_MODIFIERS} from '../../core/reaction-code-parser/reaction-code-types';
import {syncCaptureFirst} from '../../../tests/observable.helper';

describe(ReactionShortcutService.name, () => {
    let service: ReactionShortcutService;
    beforeEach(() => service = TestBed.get(ReactionShortcutService));

    const dispatchKeyup = (event: KeyboardEventInit) => document.dispatchEvent(new KeyboardEvent('keyup', event));
    const pressKey = (key: string) => dispatchKeyup({key, code: key});

    ['Escape', 'Enter', 'Backspace', 'a', 'b', 'c', '?'].forEach(code => {
        it(`should emit "${code}" code on keyup`, () => {
            const value = syncCaptureFirst(service.code(code), () => pressKey(code));
            expect(value).toEqual({
                source: 'document',
                event: {
                    type: 'keyup',
                    key: code,
                    ...REACTION_CODE_MODIFIERS
                }
            });
        });
    });
});
