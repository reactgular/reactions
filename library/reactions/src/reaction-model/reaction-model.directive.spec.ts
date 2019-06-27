import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactionModelDirective} from './reaction-model.directive';
import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Reaction, ReactionObject} from '../reaction/reaction';
import {ReactionEvent} from '../reaction-event/reaction-event';
import {createClickEvent, createDblClickEvent} from '../../tests/dom-events.helper';

// @Reaction({title: 'Create', css: 'proxy'})
class CreateDocument implements ReactionObject {
    public clicks: ReactionEvent[] = [];

    @Reaction('click')
    public click(event: ReactionEvent) {
        this.clicks.push(event);
    }
}


// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'rg-reaction-model-proxy',
    template: '<button #btn [rgReaction]="reaction"></button>'
})
class ReactionModelProxyComponent {
    @Input()
    public reaction: CreateDocument;

    @ViewChild(ReactionModelDirective, {static: false})
    public model: ReactionModelDirective;

    @ViewChild('btn', {static: false})
    public btn: ElementRef<HTMLButtonElement>;
}

fdescribe(ReactionModelDirective.name, () => {
    let component: ReactionModelProxyComponent;
    let fixture: ComponentFixture<ReactionModelProxyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReactionModelDirective,
                ReactionModelProxyComponent
            ]
        });

        fixture = TestBed.createComponent(ReactionModelProxyComponent);
        component = fixture.componentInstance;
        component.reaction = new CreateDocument();
        fixture.detectChanges();
    });

    it('should set default CSS classes', () => {
        expect(component.btn.nativeElement.className).toBe('rg-reaction rg-reaction-title proxy');
    });

    it('should forward click events to reaction', () => {
        expect(component.reaction.clicks.length).toBe(0);
        component.btn.nativeElement.dispatchEvent(createClickEvent());
        expect(component.reaction.clicks.length).toBe(1);
    });

    it('shoult not forward unbound events', () => {
        component.btn.nativeElement.dispatchEvent(createDblClickEvent());
        expect(component.reaction.clicks.length).toBe(0);
    });
});
