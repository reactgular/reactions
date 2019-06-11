import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactionMenuItemComponent} from './reaction-menu-item.component';

describe('ReactionMenuItemComponent', () => {
    let component: ReactionMenuItemComponent;
    let fixture: ComponentFixture<ReactionMenuItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReactionMenuItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReactionMenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
