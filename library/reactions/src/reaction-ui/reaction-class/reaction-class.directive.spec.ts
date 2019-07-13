import {ReactionClassDirective} from './reaction-class.directive';
import {Reaction} from '../../reaction-engine/reaction/reaction';
import {ReactionStyle} from '../../reaction-engine/reaction/reaction-style';
import {ReactionDisabled} from '../../reaction-engine/reaction/reaction-disabled';
import {ReactionVisible} from '../../reaction-engine/reaction/reaction-visible';
import {ReactionEvent} from '../../reaction-engine/reaction-event/reaction-event';
import {BehaviorSubject} from 'rxjs';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';

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

interface ReactionModelProxy {
    reaction: any;

    btn: ElementRef<HTMLButtonElement>;
}

fdescribe(ReactionClassDirective.name, () => {
    function createFixture(reaction: any): ComponentFixture<ReactionModelProxy> {
        // noinspection AngularMissingOrInvalidDeclarationInModule
        @Component({
            selector: 'rg-reaction-model-proxy',
            template: '<button #btn [reaction]="reaction" rgReactionClass></button>'
        })
        class ReactionModelProxyComponent implements ReactionModelProxy {
            public reaction = reaction;

            @ViewChild('btn', {static: false})
            public btn: ElementRef<HTMLButtonElement>;
        }

        TestBed.configureTestingModule({
            declarations: [
                ReactionModelDirective,
                ReactionClassDirective,
                ReactionModelProxyComponent
            ]
        });

        const fixture = TestBed.createComponent(ReactionModelProxyComponent);
        fixture.detectChanges();
        return fixture;
    }

    it('should set default CSS class', () => {
        const fixture = createFixture({title: 'Create'});
        const component = fixture.componentInstance;
        expect(component.btn.nativeElement.className).toBe('rg-reaction rg-reaction-title');
    });

    it('should set CSS classes', () => {
        const fixture = createFixture(new CreateDocument());
        const component = fixture.componentInstance;

        expect(component.btn.nativeElement.className).toBe('rg-reaction proxy rg-reaction-title');
        [
            {expect: 'css', value: 'css'},
            {expect: '', value: ''},
            {expect: 'dog house', value: ['dog', 'house']}
        ].forEach(data => {
            component.reaction.css.next(data.value);
            fixture.detectChanges();
            expect(component.btn.nativeElement.className).toBe(`rg-reaction rg-reaction-title ${data.expect}`.trim());
        });
    });
});
