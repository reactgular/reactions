import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {fixtureHtml, removeSpaces, stripComments} from './html.helper';

describe('html.helper', () => {
    describe(stripComments.name, () => {
        it('should not modify HTML without comments', () => {
            expect(stripComments('<html>Something</html>')).toEqual('<html>Something</html>');
        });

        it('should strip comments from HTML', () => {
            expect(stripComments('<html><!-- Exclude me -->Something</html>')).toEqual('<html>Something</html>');
        });
    });

    describe(fixtureHtml.name, () => {
        it('should return the inner HTML', () => {
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

    describe(removeSpaces.name, () => {
        it('should remove spaces around HTML nodes', () => {
            expect(removeSpaces(`
                <span></span>
                <span> inner </span>
            `)).toEqual('<span></span><span> inner </span>');
        });
    });
});
