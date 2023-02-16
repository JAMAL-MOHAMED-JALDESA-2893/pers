import { TestBed } from '@angular/core/testing';

import { AbsentismService } from './absentism.service';

describe('AbsentismService', () => {
  let service: AbsentismService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsentismService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
