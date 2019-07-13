import {ReactionClickDirective} from './reaction-click.directive';
import {createClickEvent, createDblClickEvent} from '../../../tests/dom-events.helper';
import {Reaction} from '../../reaction-engine/reaction/reaction';
import {ReactionStyle} from '../../reaction-engine/reaction/reaction-style';
import {ReactionDisabled} from '../../reaction-engine/reaction/reaction-disabled';
import {ReactionVisible} from '../../reaction-engine/reaction/reaction-visible';
import {ReactionEvent} from '../../reaction-engine/reaction-event/reaction-event';
import {BehaviorSubject} from 'rxjs';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactionProvider} from '../reaction-provider/reaction-provider';

@Reaction({title: 'Create', description: 'Creates a new document'})
class CreateDocument implements ReactionStyle, ReactionDisabled, ReactionVisible {
    public clicks: ReactionEvent[] = [];

    public css: BehaviorSubject<string | string[]> = new BehaviorSubject('proxy');

    public disabled: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public visible: BehaviorSubject<boolean> = new BehaviorSubject(true);

    @Reaction('click')
    public click(event: ReactionEvent) {
        this.clicks.push(event);
    }
}

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'rg-reaction-model-proxy',
    template: '<button #btn [reaction]="reaction"></button>'
})
class ReactionModelProxyComponent {
    public reaction: CreateDocument = new CreateDocument();

    @ViewChild(ReactionModelDirective, {static: false})
    public model: ReactionModelDirective;

    @ViewChild('btn', {static: false})
    public btn: ElementRef<HTMLButtonElement>;
}

describe(ReactionClickDirective.name, () => {
    let component: ReactionModelProxyComponent;
    let fixture: ComponentFixture<ReactionModelProxyComponent>;
    let reactionProvider: ReactionProvider;

    beforeEach(() => {
        reactionProvider = new ReactionProvider();

        TestBed.configureTestingModule({
            declarations: [
                ReactionModelDirective,
                ReactionModelProxyComponent
            ]
        });

        TestBed.overrideDirective(ReactionModelDirective, {
            set: {
                providers: [{provide: ReactionProvider, useValue: reactionProvider}]
            }
        });

        fixture = TestBed.createComponent(ReactionModelProxyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should forward click events to reaction', () => {
        expect(component.reaction.clicks.length).toBe(0);
        component.btn.nativeElement.dispatchEvent(createClickEvent());
        expect(component.reaction.clicks.length).toBe(1);
    });

    it('should not forward unbound events', () => {
        component.btn.nativeElement.dispatchEvent(createDblClickEvent());
        expect(component.reaction.clicks.length).toBe(0);
    });
});
