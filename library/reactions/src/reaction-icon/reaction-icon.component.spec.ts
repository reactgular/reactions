import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionIconComponent } from './reaction-icon.component';

describe('ReactionIconComponent', () => {
  let component: ReactionIconComponent;
  let fixture: ComponentFixture<ReactionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
