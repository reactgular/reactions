import {Component, Input, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ReactionBase} from '../reaction-base/reaction-base';
import {ReactionTextComponent} from './reaction-text.component';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'rg-reaction-text-proxy',
    template: `
        <button [rgReaction]="reaction">
            <rg-reaction-text></rg-reaction-text>
        </button>`
})
class ReactionTextProxyComponent {
    @Input()
    public reaction: ReactionBase;

    @ViewChild(ReactionTextComponent, {static: true})
    public reactionText: ReactionTextComponent;
}

describe(ReactionTextComponent.name, () => {
    let component: ReactionTextComponent;
    let fixture: ComponentFixture<ReactionTextProxyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [
                ReactionModelDirective,
                ReactionTextComponent,
                ReactionTextProxyComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ReactionTextProxyComponent);
        fixture.detectChanges();
        component = fixture.componentInstance.reactionText;
    }));

    it('should create', () => {
        // expect(component).toBeTruthy();
    });
});
