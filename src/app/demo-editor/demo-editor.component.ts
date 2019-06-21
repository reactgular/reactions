import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {startWith, takeUntil, tap} from 'rxjs/operators';
import {ReactionSnapshots} from '../../../library/reactions/src/reaction-snapshots/reaction-snapshots';
import {DemoStateService} from '../demo-state/demo-state.service';

@Component({
    selector: 'rg-demo-editor',
    templateUrl: './demo-editor.component.html',
    styleUrls: ['./demo-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoEditorComponent implements OnInit, OnDestroy {
    /**
     * The form to be edited.
     */
    public group: FormGroup;

    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(private _fb: FormBuilder,
                       private _state: DemoStateService) {
    }

    /**
     * Destruction
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * Initialization
     */
    public ngOnInit(): void {
        const title = this._fb.control('Create Document');
        const tooltip = this._fb.control('Create a new document.');
        const icon = this._fb.control('fa-plus');
        const css = this._fb.control('text-danger');
        this.group = this._fb.group({title, tooltip, icon, css});

        this.group.valueChanges.pipe(
            startWith<ReactionSnapshots, ReactionSnapshots>(this.group.value),
            tap(value => console.log(value)),
            takeUntil(this._destroyed$)
        ).subscribe(snapshot => this._state.next(snapshot));
    }
}
