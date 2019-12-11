import {Component, Input, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ReactionViewComponent} from './reaction-view.component';
import {ReactionObject} from '../../core/reaction-types';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'rg-reaction-text-proxy',
    template: `
        <button [rgReaction]="reaction">
            <rg-reaction-view></rg-reaction-view>
        </button>`
})
class ReactionTextProxyComponent {
    @Input()
    public reaction: ReactionObject;

    @ViewChild(ReactionViewComponent, {static: true})
    public reactionText: ReactionViewComponent;
}

describe(ReactionViewComponent.name, () => {
    let component: ReactionViewComponent;
    let fixture: ComponentFixture<ReactionTextProxyComponent>;

    beforeEach(async(() => {
        // TestBed.configureTestingModule({
        //     imports: [FontAwesomeModule],
        //     declarations: [
        //         ReactionModelDirective,
        //         ReactionTextComponent,
        //         ReactionTextProxyComponent
        //     ]
        // }).compileComponents();
        //
        // fixture = TestBed.createComponent(ReactionTextProxyComponent);
        // fixture.detectChanges();
        // component = fixture.componentInstance.reactionText;
    }));

    it('should create', () => {
        // expect(component).toBeTruthy();
    });
});
