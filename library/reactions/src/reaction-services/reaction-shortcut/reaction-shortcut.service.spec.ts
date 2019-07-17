import {TestBed} from '@angular/core/testing';
import {ReactionShortcutService} from './reaction-shortcut.service';
import {REACTION_CODE_MODIFIERS} from '../../reaction-engine/reaction-code-parser/reaction-code-types';
import {syncCaptureFirst} from '../../../tests/observable.helper';

describe(ReactionShortcutService.name, () => {
    let service: ReactionShortcutService;
    beforeEach(() => service = TestBed.get(ReactionShortcutService));

    const dispatchKeyup = (event: KeyboardEventInit) => document.dispatchEvent(new KeyboardEvent('keyup', event));
    const pressKey = (key: string) => dispatchKeyup({key, code: key});

    ['Escape', 'Enter', 'Backspace', 'a', 'b', 'c', '?'].forEach(type => {
        it(`should emit "${type}" code on keyup`, () => {
            const value = syncCaptureFirst(service.code(type), () => pressKey(type));
            expect(value).toEqual({type, modifiers: REACTION_CODE_MODIFIERS});
        });
    });
});
