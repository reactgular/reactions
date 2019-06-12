import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {startWith, takeUntil, tap} from 'rxjs/operators';
import {ReactionSnapshot} from '../../../library/reactions/src/reaction-snapshot/reaction-snapshot';

@Component({
    selector: 'rg-reaction-editor',
    templateUrl: './reaction-editor.component.html',
    styleUrls: ['./reaction-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionEditorComponent implements OnInit, OnDestroy {
    /**
     * The form to be edited.
     */
    public group: FormGroup;

    /**
     * Emits changes to a reaction's internal snapshot.
     */
    @Output()
    public snapshot: EventEmitter<ReactionSnapshot> = new EventEmitter();

    /**
     * Destructor event
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(private _fb: FormBuilder) {
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
        const toolTip = this._fb.control('Create a new document.');
        const icon = this._fb.control('fa-plus');
        this.group = this._fb.group({title, toolTip, icon});

        this.group.valueChanges.pipe(
            startWith<ReactionSnapshot, ReactionSnapshot>(this.group.value),
            tap(value => console.log(value)),
            takeUntil(this._destroyed$)
        ).subscribe(snapshot => this.snapshot.emit(snapshot));
    }
}
