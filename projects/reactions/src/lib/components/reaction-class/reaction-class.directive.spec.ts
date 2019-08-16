import {ReactionClassDirective} from './reaction-class.directive';
import {merge, of} from 'rxjs';
import {Component, DebugElement} from '@angular/core';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {delay} from 'rxjs/operators';
import {By} from '@angular/platform-browser';

class ClassFixture {
    public button: DebugElement;

    private _fixture: ComponentFixture<any>;

    public constructor(reaction: any) {
        // noinspection AngularMissingOrInvalidDeclarationInModule
        @Component({
            selector: 'rg-reaction-proxy',
            template: '<button [rgReaction]="reaction" rgReactionClass></button>'
        })
        class ReactionProxyComponent {
            public reaction = reaction;
        }

        TestBed.configureTestingModule({
            declarations: [
                ReactionModelDirective,
                ReactionClassDirective,
                ReactionProxyComponent
            ]
        });

        this._fixture = TestBed.createComponent(ReactionProxyComponent);
        this._fixture.detectChanges();
        this.button = this._fixture.debugElement.query(By.directive(ReactionClassDirective));
    }

    public btnClass = () => this.button.classes;

    public tick() {
        tick(1000);
        this._fixture.detectChanges();
    }
}

describe(ReactionClassDirective.name, () => {
    const fixtureClass = (reaction: any) => new ClassFixture(reaction).btnClass();
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

        function shouldRemoveClass(name: string, before: any, after: any = undefined) {
            it(`should set "rg-reaction-${name}" and then remove it`, fakeAsync(() => {
                const fixture = new ClassFixture({[name]: delayed$(before, after)});
                expect(fixture.btnClass()).toEqual({...c, [`rg-reaction-${name}`]: true});
                fixture.tick();
                expect(fixture.btnClass()).toEqual({...c, [`rg-reaction-${name}`]: false});
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
