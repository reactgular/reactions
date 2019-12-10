import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactionMatButtonComponent} from './reaction-mat-button.component';

describe(ReactionMatButtonComponent.name, () => {
    let component: ReactionMatButtonComponent;
    let fixture: ComponentFixture<ReactionMatButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReactionMatButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReactionMatButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
