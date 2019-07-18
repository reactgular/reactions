import {Inject, Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {filter, map, mapTo} from 'rxjs/operators';
import {reactionCodeParser} from '../../core/reaction-code-parser/reaction-code-parser';
import {ReactionCode} from '../../core/reaction-code-parser/reaction-code-types';

@Injectable({providedIn: 'root'})
export class ReactionShortcutService {
    /**
     * Emits when the ESC key is pressed.
     */
    public readonly esc$: Observable<void>;

    /**
     * Emits when the DEL or BACKSPACE key is pressed.
     */
    public readonly del$: Observable<void>;

    /**
     * Emits when the ENTER key is pressed.
     */
    public readonly enter$: Observable<void>;

    /**
     * Constructor
     */
    public constructor(@Inject(DOCUMENT) private _doc: any) {
        this.esc$ = this.code('escape').pipe(mapTo(undefined));
        this.enter$ = this.code('enter').pipe(mapTo(undefined));
        this.del$ = this.code('delete, backspace').pipe(mapTo(undefined));
    }

    /**
     * Emits when keyboard keys have been pressed.
     */
    public code(type: string): Observable<ReactionCode> {
        const codes = reactionCodeParser(type);
        const matchCode = (event: KeyboardEvent, code: ReactionCode) =>
            event.key === code.type
            && event.ctrlKey === code.modifiers.ctrlKey
            && event.altKey === code.modifiers.altKey
            && event.metaKey === code.modifiers.metaKey;
        return fromEvent<KeyboardEvent>(this._doc, 'keyup').pipe(
            map((event: KeyboardEvent) => codes.find(c => matchCode(event, c))),
            filter(Boolean)
        );
    }
}
