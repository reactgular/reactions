import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ReactionTemplatesService} from '@reactgular/reactions';

/**
 * Provides a template for rendering icons via the FontAwesome icon library for Angular.
 */
@Component({
    selector: 'rg-reaction-fontawesome',
    templateUrl: './reaction-fontawesome.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ReactionTemplatesService
    ]
})
export class ReactionFontawesomeComponent implements OnInit {
    /**
     * Render all icons as fixedWith.
     */
    @Input()
    public fixedWidth: boolean = true;

    @ViewChild('icon', {static: true})
    public iconTemplate: TemplateRef<any>;

    public constructor(private readonly _reactionTemplates: ReactionTemplatesService) {

    }

    public ngOnInit(): void {
        this._reactionTemplates.primary(this.iconTemplate);
        this._reactionTemplates.secondary(this.iconTemplate);
    }
}
