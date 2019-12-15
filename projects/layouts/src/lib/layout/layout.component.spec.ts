import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';

@Component({
    template: `
        <rg-layout></rg-layout>`
})
export class MockComponent {

}

describe('LayoutComponent', () => {
    let component: MockComponent;
    let fixture: ComponentFixture<MockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockComponent,
                LayoutComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
