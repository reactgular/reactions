import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {Reaction, ReactionDisabled, ReactionEvent} from '@reactgular/reactions';
import {concat, Observable, of} from 'rxjs';
import {delay, repeat} from 'rxjs/operators';

@Reaction({
    title: 'Edit',
    tooltip: 'Edits a note',
    icon: faPencilAlt
})
export class EditReaction implements ReactionDisabled {

    @Reaction('click')
    public click(event: ReactionEvent) {
        // @todo appears to be a bug if a reaction has no bindings.
    }

    public disabled(): Observable<boolean> {
        return concat(
            of(false),
            of(true).pipe(delay(2000)),
            of(false).pipe(delay(2000))
        ).pipe(
            repeat()
        );
    }
}
