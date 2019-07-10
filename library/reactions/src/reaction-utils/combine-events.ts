import {ElementRef} from '@angular/core';
import {fromEvent, merge, Observable} from 'rxjs';
import {throttleTimeIf} from './observables';
import {tap} from 'rxjs/operators';
import {ReactionEventBinding} from '../reaction/reaction-types';

export function combineEvents(el: ElementRef<HTMLElement>, hooks: ReactionEventBinding[]): Observable<UIEvent> {
    const events$ = hooks.map(({type, debounce}) => fromEvent<UIEvent>(el.nativeElement, type)
        .pipe(throttleTimeIf(Boolean(debounce), debounce)));
    return merge<UIEvent>(...events$).pipe(
        tap(event => event.preventDefault())
    );
}
