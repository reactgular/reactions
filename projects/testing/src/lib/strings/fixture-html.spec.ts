import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {fixtureHtml} from './fixture-html';

describe(fixtureHtml.name, () => {
    it('should return the inner HTML', () => {
        // noinspection AngularMissingOrInvalidDeclarationInModule
        @Component({
            template: `
                    <ng-container *ngIf="cond">
                        <span>Line A</span>
                        <span>Line B</span>
                    </ng-container>`
        })
        class ExampleComponent {
            public cond = true;
        }

        TestBed.configureTestingModule({declarations: [ExampleComponent]}).compileComponents();
        const fixture = TestBed.createComponent(ExampleComponent);
        expect(fixtureHtml(fixture)).toEqual('<span>Line A</span><span>Line B</span>');
    });
});
