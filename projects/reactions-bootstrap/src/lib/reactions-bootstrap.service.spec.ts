import { TestBed } from '@angular/core/testing';

import { ReactionsBootstrapService } from './reactions-bootstrap.service';

describe('ReactionsBootstrapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReactionsBootstrapService = TestBed.get(ReactionsBootstrapService);
    expect(service).toBeTruthy();
  });
});
