import { TestBed } from '@angular/core/testing';

import { AbsentismconfigService } from './absentismconfig.service';

describe('AbsentismconfigService', () => {
  let service: AbsentismconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsentismconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
