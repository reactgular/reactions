import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactionButtonComponent} from './reaction-button.component';

describe(ReactionButtonComponent.name, () => {
    let component: ReactionButtonComponent;
    let fixture: ComponentFixture<ReactionButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReactionButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReactionButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
