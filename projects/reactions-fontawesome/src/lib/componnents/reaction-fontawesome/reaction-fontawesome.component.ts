import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ReactionTemplatesService} from '@reactgular/reactions';

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
    @Input()
    public fixedWidth: boolean = true;

    @ViewChild('icon', {static: true})
    public iconTemplate: TemplateRef<any>;

    public constructor(private readonly _reactionTemplates: ReactionTemplatesService) {

    }

    public ngOnInit(): void {
        console.log(this.iconTemplate);
        this._reactionTemplates.primary(this.iconTemplate);
        this._reactionTemplates.secondary(this.iconTemplate);
    }
}
