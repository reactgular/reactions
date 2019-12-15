import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ScrollableComponent} from './scrollable.component';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    template: `
        <rg-scrollable [horizontal]="horizontal"></rg-scrollable>`
})
export class MockComponent {
    @Input()
    public horizontal: boolean | 'both' = false;
}

describe(ScrollableComponent.name, () => {
    let fixture: ComponentFixture<MockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                MockComponent,
                ScrollableComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MockComponent);
        fixture.detectChanges();
    });

    it('should have vertical scrolling', () => {
        fixture.componentInstance.horizontal = false;
        fixture.detectChanges();
        const vertical = fixture.debugElement.query(By.css('.rg-vertical'));
        expect(vertical).toBeTruthy();
        const horizontal = fixture.debugElement.query(By.css('.rg-horizontal'));
        expect(horizontal).toBeNull();
    });

    it('should have horizontal scrolling', () => {
        fixture.componentInstance.horizontal = true;
        fixture.detectChanges();
        const vertical = fixture.debugElement.query(By.css('.rg-vertical'));
        expect(vertical).toBeNull();
        const horizontal = fixture.debugElement.query(By.css('.rg-horizontal'));
        expect(horizontal).toBeTruthy();
    });

    it('should have scrolling for both', () => {
        fixture.componentInstance.horizontal = 'both';
        fixture.detectChanges();
        const vertical = fixture.debugElement.query(By.css('.rg-vertical'));
        expect(vertical).toBeTruthy();
        const horizontal = fixture.debugElement.query(By.css('.rg-horizontal'));
        expect(horizontal).toBeTruthy();
    });
});
