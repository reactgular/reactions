import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactionMatMoreComponent} from './reaction-mat-more.component';

describe(ReactionMatMoreComponent.name, () => {
    let component: ReactionMatMoreComponent;
    let fixture: ComponentFixture<ReactionMatMoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReactionMatMoreComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReactionMatMoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
