import {Inject, Injectable} from '@angular/core';
import {fromEvent, merge, Observable} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {map, mapTo} from 'rxjs/operators';
import {reactionCodeParser} from '../../core/reaction-code-parser/reaction-code-parser';
import {ReactionCode} from '../../core/reaction-types';

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
        this.esc$ = this.code('Escape').pipe(mapTo(undefined));
        this.enter$ = this.code('Enter').pipe(mapTo(undefined));
        this.del$ = this.code('Delete, Backspace').pipe(mapTo(undefined));
    }

    /**
     * Emits when keyboard keys have been pressed.
     */
    public code(type: string): Observable<ReactionCode> {
        const reactionMatchEvent = (e: Event, c: ReactionCode): boolean => Object.values(c.event).every(p => e[p[0]] === p[1]);
        const events = reactionCodeParser(type)
            .filter(code => code.source === 'document')
            .map(code => {
                return fromEvent<KeyboardEvent>(this._doc, code.event.type)
                    .pipe(
                        map((event: KeyboardEvent) => reactionMatchEvent(event, code)),
                        mapTo(code)
                    );
            });
        return merge(...events);
    }
}
