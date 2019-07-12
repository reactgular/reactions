import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactionModelDirective} from './reaction-model.directive';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {Reaction} from '../../reaction-engine/reaction/reaction';
import {ReactionEvent} from '../../reaction-engine/reaction-event/reaction-event';
import {createClickEvent, createDblClickEvent} from '../../../tests/dom-events.helper';
import {first} from 'rxjs/operators';
import {ReactionSnapshot} from '../../reaction-engine/reaction-snapshots/reaction-snapshot';
import {BehaviorSubject} from 'rxjs';
import {ReactionStyle} from '../../reaction-engine/reaction/reaction-style';
import {ReactionDisabled} from '../../reaction-engine/reaction/reaction-disabled';
import {ReactionVisible} from '../../reaction-engine/reaction/reaction-visible';

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
    template: '<button #btn [rgReaction]="reaction"></button>'
})
class ReactionModelProxyComponent {
    public reaction: CreateDocument = new CreateDocument();

    @ViewChild(ReactionModelDirective, {static: false})
    public model: ReactionModelDirective;

    @ViewChild('btn', {static: false})
    public btn: ElementRef<HTMLButtonElement>;
}

describe(ReactionModelDirective.name, () => {
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
        fixture.detectChanges();
    });

    it('should emit snapshots', () => {
        let snapshot: ReactionSnapshot;
        component.model.snapshot$.pipe(first()).subscribe(s => snapshot = s);
        expect(snapshot).toEqual({
            animate: undefined,
            css: ['proxy'],
            description: 'Creates a new document',
            disabled: false,
            icon: undefined,
            order: '0',
            secondary: undefined,
            secondaryAnimate: undefined,
            title: 'Create',
            tooltip: undefined,
            visible: true
        });
    });

    it('should disable the button', () => {

    });

    it('should hide the button', () => {

    });

    it('should set CSS classes', () => {
        expect(component.btn.nativeElement.className).toBe('rg-reaction proxy rg-reaction-title');
        [
            {expect: 'css', value: 'css'},
            {expect: '', value: ''},
            {expect: 'dog house', value: ['dog', 'house']}
        ].forEach(data => {
            component.reaction.css.next(data.value);
            fixture.detectChanges();
            expect(component.btn.nativeElement.className).toBe(('rg-reaction rg-reaction-title ' + data.expect).trim());
        });
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
