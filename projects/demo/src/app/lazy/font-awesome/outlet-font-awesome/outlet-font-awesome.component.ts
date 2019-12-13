import {ChangeDetectionStrategy, Component, Inject, InjectionToken} from '@angular/core';
import {faBookmark, faHome, faPager, faRecycle, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ReactionObject} from '@reactgular/reactions';
import {BothIconsReaction} from '../reactions/both-icons.reaction';
import {PrimaryIconReaction} from '../reactions/primary-icon.reaction';
import {SecondaryIconReaction} from '../reactions/secondary-icon.reaction';

export const REACTIONS: InjectionToken<ReactionObject> = new InjectionToken<ReactionObject>('REACTIONS');

@Component({
    selector: 'rg-outlet-font-awesome',
    templateUrl: './outlet-font-awesome.component.html',
    styleUrls: ['./outlet-font-awesome.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: REACTIONS, useClass: BothIconsReaction, multi: true},
        {provide: REACTIONS, useClass: PrimaryIconReaction, multi: true},
        {provide: REACTIONS, useClass: SecondaryIconReaction, multi: true}
    ]
})
export class OutletFontAwesomeComponent {
    public icons = [
        faHome,
        faPager,
        faBookmark,
        faRecycle,
        faSpinner
    ];

    public primaryIcon: any;

    public secondaryIcon: any;

    public constructor(@Inject(REACTIONS) public readonly reactions: ReactionObject[]) {
        this.primaryIcon = this.icons[0];
        this.secondaryIcon = this.icons[0];
    }

    public setPrimaryIcon = (value: any) => {
        this.primaryIcon = value;
    };

    public setSecondaryIcon = (value: any) => {
        this.secondaryIcon = value;
    };
}
