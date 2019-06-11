import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionLabelComponent } from './reaction-label.component';

describe('ReactionLabelComponent', () => {
  let component: ReactionLabelComponent;
  let fixture: ComponentFixture<ReactionLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
