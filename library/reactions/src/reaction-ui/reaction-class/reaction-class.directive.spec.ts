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

fdescribe(ReactionClassDirective.name, () => {
    const btnClass = (fixture: ComponentFixture<ReactionModelProxy>): { [key: string]: boolean; } =>
        fixture.debugElement.query(el => el.name === 'button').classes;
    const fixtureClass = (reaction: any) => btnClass(createFixture(reaction));
    const c = {'rg-reaction': true};

    it('should set "rg-reaction" class', () => expect(fixtureClass({})).toEqual(c));

    describe('set a CSS class for a property', () => {
        const shouldSetClass = (name: string, value: any) =>
            it(`should read "${name}" property and set "rg-reaction-${name}" class`, () =>
                expect(fixtureClass({[name]: value})).toEqual({...c, [`rg-reaction-${name}`]: true}));

        shouldSetClass('icon', 'fa-document');
        shouldSetClass('secondary', 'fa-document');
        shouldSetClass('title', 'Create');
        shouldSetClass('tooltip', 'Create a document');
        shouldSetClass('animate', 'spin');
        shouldSetClass('disabled', true);
    });

    describe('when CSS property emits a value set CSS class with that value', () => {
        it('should set "proxy" class', () => expect(fixtureClass({css: 'proxy'})).toEqual({...c, proxy: true}));
        it('should set "one, two, three" classes', () => expect(fixtureClass({css: ['one', 'two', 'three']})).toEqual({
            ...c,
            one: true,
            two: true,
            three: true
        }));
    });

    describe('set CSS class then remove after a delay', function () {
        const delayed$ = (a, b = undefined, d = 100) => merge(of(a), of(b).pipe(delay(d)));
        const tickFixture = (fixture: ComponentFixture<ReactionModelProxy>) => (tick(1000), fixture.detectChanges());

        function shouldRemoveClass(name: string, before: any, after: any = undefined) {
            it(`should set "rg-reaction-${name}" and then remove it`, fakeAsync(() => {
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
});
