import {Reaction, ReactionEvent} from '@reactgular/reactions';

@Reaction({
    title: 'Edit',
    tooltip: 'Edits a note',
    icon: 'fa-pencil'
})
export class EditReaction {
    @Reaction('click')
    public click(event: ReactionEvent) {
        // @todo appears to be a bug if a reaction has no bindings.
    }
}
