import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactionTextComponent} from './reaction-text.component';

describe(ReactionTextComponent.name, () => {
    let component: ReactionTextComponent;
    let fixture: ComponentFixture<ReactionTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReactionTextComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReactionTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
