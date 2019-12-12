import {Directive, Input, TemplateRef} from '@angular/core';
import {ReactionTemplatesService} from '../../services/reaction-templates/reaction-templates.service';

@Directive({
    selector: '[rgReactionTemplates]',
    providers: [
        ReactionTemplatesService
    ]
})
export class ReactionTemplatesDirective {
    public constructor(private readonly _reactionTemplates: ReactionTemplatesService) {
    }

    @Input()
    public set primary(ref: TemplateRef<any>) {
        this._reactionTemplates.primary(ref);
    }

    @Input()
    public set secondary(ref: TemplateRef<any>) {
        this._reactionTemplates.secondary(ref);
    }
}
