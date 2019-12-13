import {faHome} from '@fortawesome/free-solid-svg-icons';
import {BehaviorSubject, Observable} from 'rxjs';

export abstract class IconReaction {
    protected _primary$ = new BehaviorSubject(faHome);

    protected _secondary$ = new BehaviorSubject(faHome);

    public primary(): Observable<any> {
        console.error('PRIMARY', this);

        return this._primary$.asObservable();
    }

    public secondary(): Observable<any> {
        return this._secondary$.asObservable();
    }
}
