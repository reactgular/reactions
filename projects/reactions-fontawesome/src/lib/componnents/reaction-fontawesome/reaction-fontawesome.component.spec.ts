import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactionFontawesomeComponent} from './reaction-fontawesome.component';

describe(ReactionFontawesomeComponent.name, () => {
    let component: ReactionFontawesomeComponent;
    let fixture: ComponentFixture<ReactionFontawesomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReactionFontawesomeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReactionFontawesomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
