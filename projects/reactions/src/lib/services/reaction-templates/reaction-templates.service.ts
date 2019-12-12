import {Injectable, TemplateRef} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class ReactionTemplatesService {
    /**
     * Emits the template used to render the primary icon.
     */
    private readonly _primary$: ReplaySubject<TemplateRef<any>> = new ReplaySubject(1);

    /**
     * Emits the template used to render the secondary icon.
     */
    private readonly _secondary$: ReplaySubject<TemplateRef<any>> = new ReplaySubject(1);

    /**
     * Gets an observable of the primary icon template.
     */
    public get primary$(): Observable<TemplateRef<any>> {
        return this._primary$.asObservable();
    }

    /**
     * Gets an observable of the secondary icon template.
     */
    public get secondary$(): Observable<TemplateRef<any>> {
        return this._secondary$.asObservable();
    }

    /**
     * Sets the template for the primary icon.
     */
    public primary(ref: TemplateRef<any>) {
        this._primary$.next(ref);
    }

    /**
     * Sets the template for the secondary icon.
     */
    public secondary(ref: TemplateRef<any>) {
        this._secondary$.next(ref);
    }
}
