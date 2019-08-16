import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsBootstrapComponent } from './reactions-bootstrap.component';

describe('ReactionsBootstrapComponent', () => {
  let component: ReactionsBootstrapComponent;
  let fixture: ComponentFixture<ReactionsBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
