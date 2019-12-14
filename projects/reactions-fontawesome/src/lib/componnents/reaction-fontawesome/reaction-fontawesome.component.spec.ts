import {Component, Input} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {ReactionIconModule, ReactionModelModule} from '@reactgular/reactions';
import {ReactionFontawesomeComponent} from './reaction-fontawesome.component';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    template: `
        <rg-reaction-fontawesome [fixedWidth]="fixedWidth">
            <ng-container [rgReaction]="reaction">
                <rg-reaction-icon></rg-reaction-icon>
            </ng-container>
        </rg-reaction-fontawesome>
    `
})
export class MockComponent {
    @Input()
    public fixedWidth = true;

    @Input()
    public reaction = {primary: faHome};
}

describe(ReactionFontawesomeComponent.name, () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FontAwesomeModule,
                ReactionModelModule,
                ReactionIconModule
            ],
            declarations: [
                MockComponent,
                ReactionFontawesomeComponent
            ]
        }).compileComponents();
    }));

    it('should create render an icon as the primary', () => {
        const fixture = TestBed.createComponent(ReactionFontawesomeComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
