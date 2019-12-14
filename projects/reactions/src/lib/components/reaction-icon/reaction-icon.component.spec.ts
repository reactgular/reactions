import {Component, Input} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {fixtureHtml, removeSpaces} from '../../../tests/html.helper';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ReactionTemplatesDirective} from '../reaction-templates/reaction-templates.directive';
import {ReactionIconComponent} from './reaction-icon.component';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'rg-mock-icon',
    template: `
        <ng-container rgReactionTemplates
                      [primary]="primaryRef"
                      [secondary]="secondaryRef"
                      [rgReaction]="reaction">
            <rg-reaction-icon [secondary]="secondary"></rg-reaction-icon>
        </ng-container>
        <ng-template #primaryRef let-icon><span class="primary-template">{{icon}}</span></ng-template>
        <ng-template #secondaryRef let-icon><span class="secondary-template">{{icon}}</span></ng-template>
    `
})
class MockIconComponent {
    @Input()
    public reaction = {primary: 'primary', secondary: 'secondary'};

    @Input()
    public secondary = false;
}

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'rg-mock-missing-template-service',
    template: `
        <div [rgReaction]="reaction">
            <rg-reaction-icon></rg-reaction-icon>
        </div>
    `
})
class MockMissingProviderComponent {
    public reaction = {title: 'Example'};
}

describe(ReactionIconComponent.name, () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockIconComponent,
                MockMissingProviderComponent,
                ReactionModelDirective,
                ReactionTemplatesDirective,
                ReactionIconComponent
            ]
        }).compileComponents();
    }));

    it('should throw an error when template service is missing', () => {
        expect(() => {
            TestBed.createComponent(MockMissingProviderComponent);
        }).toThrow(new Error('ReactionTemplatesService not found. Did you forget to provide it a component?'));
    });

    it('should render the primary icon', () => {
        const fixture = TestBed.createComponent(MockIconComponent);
        const html = fixtureHtml(fixture);
        // noinspection HtmlUnknownAttribute
        expect(html).toEqual(removeSpaces(`
<rg-reaction-icon ng-reflect-secondary="false">
    <span class="rg-reaction-icon rg-reaction-primary">
        <span class="primary-template">primary</span>
    </span>
</rg-reaction-icon>`));
    });

    it('should render the secondary icon', () => {
        const fixture = TestBed.createComponent(MockIconComponent);
        fixture.componentInstance.secondary = true;
        const html = fixtureHtml(fixture);
        // noinspection HtmlUnknownAttribute
        expect(html).toEqual(removeSpaces(`
<rg-reaction-icon ng-reflect-secondary="true">
    <span class="rg-reaction-icon rg-reaction-secondary">
        <span class="secondary-template">secondary</span>
    </span>
</rg-reaction-icon>`));
    });

    it('should not render a primary icon', () => {
        const fixture = TestBed.createComponent(MockIconComponent);
        fixture.componentInstance.reaction = {primary: undefined, secondary: 'secondary'};
        const html = fixtureHtml(fixture);
        // noinspection HtmlUnknownAttribute
        expect(html).toEqual(removeSpaces(`<rg-reaction-icon ng-reflect-secondary="false"></rg-reaction-icon>`));
    });

    it('should not render a secondary icon', () => {
        const fixture = TestBed.createComponent(MockIconComponent);
        fixture.componentInstance.reaction = {primary: 'primary', secondary: undefined};
        fixture.componentInstance.secondary = true;
        const html = fixtureHtml(fixture);
        // noinspection HtmlUnknownAttribute
        expect(html).toEqual(removeSpaces(`<rg-reaction-icon ng-reflect-secondary="true"></rg-reaction-icon>`));
    });
});
