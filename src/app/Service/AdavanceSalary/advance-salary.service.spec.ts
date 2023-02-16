import { TestBed } from '@angular/core/testing';

import { AdvanceSalaryService } from './advance-salary.service';

describe('AdvanceSalaryService', () => {
  let service: AdvanceSalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvanceSalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
