import {TestBed} from '@angular/core/testing';
import {ReactionShortcutService} from './reaction-shortcut.service';
import {REACTION_CODE_MODIFIERS, ReactionCode} from '../../reaction-engine/reaction-code-parser/reaction-code-types';

describe(ReactionShortcutService.name, () => {
    let service: ReactionShortcutService;
    beforeEach(() => service = TestBed.get(ReactionShortcutService));

    const dispatchKeyup = (event: KeyboardEventInit) => document.dispatchEvent(new KeyboardEvent('keyup', event));
    const pressKey = (key: string) => dispatchKeyup({key, code: key});
    const pressEsc = () => pressKey('Escape');
    const pressEnter = () => pressKey('Enter');
    const pressBackspace = () => pressKey('Backspace');

    it('should emit ESC key pressed', () => {
        const values: ReactionCode[] = [];
        const sub = service.code('Escape').subscribe(v => values.push(v));
        pressEsc();
        sub.unsubscribe();
        expect(values).toEqual([{type: 'Escape', modifiers: REACTION_CODE_MODIFIERS}]);
    });

    it('should emit DELETE key pressed', () => {

    });

    it('should emit ENTER key pressed', () => {

    });

    it('should emit key pressed ignoring case', () => {

    });

    it('should emit key pressed matching case', () => {

    });
});
