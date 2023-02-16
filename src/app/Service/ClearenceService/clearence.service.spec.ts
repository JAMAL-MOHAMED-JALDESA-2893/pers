import { TestBed } from '@angular/core/testing';

import { ClearenceService } from './clearence.service';

describe('ClearenceService', () => {
  let service: ClearenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
