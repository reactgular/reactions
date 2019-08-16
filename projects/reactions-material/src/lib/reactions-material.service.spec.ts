import { TestBed } from '@angular/core/testing';

import { ReactionsMaterialService } from './reactions-material.service';

describe('ReactionsMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReactionsMaterialService = TestBed.get(ReactionsMaterialService);
    expect(service).toBeTruthy();
  });
});
