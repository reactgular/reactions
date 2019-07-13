import {ReactionClassDirective} from './reaction-class.directive';
import {merge, of} from 'rxjs';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {delay} from 'rxjs/operators';

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

    const btnClass = (fixture: ComponentFixture<ReactionModelProxy>): { [key: string]: boolean; } =>
        fixture.debugElement.query(el => el.name === 'button').classes;

    const fixtureClass = (reaction: any) => btnClass(createFixture(reaction));

    const c = {'rg-reaction': true};

    describe('setting of CSS class', () => {
        it('should set default class', () => expect(fixtureClass({})).toEqual(c));
        it('should set icon class', () => expect(fixtureClass({icon: 'fa-document'})).toEqual({...c, 'rg-reaction-icon': true}));
        it('should set secondary class', () => expect(fixtureClass({secondary: 'fa-document'})).toEqual({
            ...c,
            'rg-reaction-secondary': true
        }));
        it('should set title class', () => expect(fixtureClass({title: 'Create'})).toEqual({...c, 'rg-reaction-title': true}));
        it('should set tooltip class', () => expect(fixtureClass({tooltip: 'Create a document'})).toEqual({
            ...c,
            'rg-reaction-tooltip': true
        }));
        it('should set animate class', () => expect(fixtureClass({animate: 'spin'})).toEqual({...c, 'rg-reaction-animate': true}));
        it('should set disabled class', () => expect(fixtureClass({disabled: true})).toEqual({...c, 'rg-reaction-disabled': true}));
        it('should set CSS class', () => expect(fixtureClass({css: 'proxy'})).toEqual({...c, proxy: true}));
        it('should set CSS classes', () => expect(fixtureClass({css: ['one', 'two', 'three']})).toEqual({
            ...c,
            one: true,
            two: true,
            three: true
        }));
    });

    describe('setting of CSS class and then removing', function () {
        const delayed$ = (a, b = undefined, d = 100) => merge(of(a), of(b).pipe(delay(d)));
        const tickFixture = (fixture) => (tick(1000), fixture.detectChanges());

        function shouldRemoveClass(name: string, before: any, after: any = undefined) {
            it(`should remove ${name} class`, fakeAsync(() => {
                const fixture = createFixture({[name]: delayed$(before, after)});
                expect(btnClass(fixture)).toEqual({...c, [`rg-reaction-${name}`]: true});
                tickFixture(fixture);
                expect(btnClass(fixture)).toEqual({...c, [`rg-reaction-${name}`]: false});
            }));
        }

        shouldRemoveClass('icon', 'fa-document');
        shouldRemoveClass('secondary', 'fa-document');
        shouldRemoveClass('title', 'Create');
        shouldRemoveClass('tooltip', 'Creates a new document.');
        shouldRemoveClass('animate', 'spin');
        shouldRemoveClass('disabled', true, false);
    });


    it('should set CSS classes', () => {
        // const fixture = createFixture(new CreateDocument());
        // const component = fixture.componentInstance;
        // expect(component.btn.nativeElement.className).toBe('rg-reaction proxy rg-reaction-title');
        // [
        //     {expect: 'css', value: 'css'},
        //     {expect: '', value: ''},
        //     {expect: 'dog house', value: ['dog', 'house']}
        // ].forEach(data => {
        //     component.reaction.css.next(data.value);
        //     fixture.detectChanges();
        //     expect(component.btn.nativeElement.className).toBe(`rg-reaction rg-reaction-title ${data.expect}`.trim());
        // });
    });
});
