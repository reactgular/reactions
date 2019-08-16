import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsMaterialComponent } from './reactions-material.component';

describe('ReactionsMaterialComponent', () => {
  let component: ReactionsMaterialComponent;
  let fixture: ComponentFixture<ReactionsMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
