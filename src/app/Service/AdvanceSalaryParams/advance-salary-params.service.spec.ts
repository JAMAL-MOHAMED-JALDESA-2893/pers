import { TestBed } from '@angular/core/testing';

import { AdvanceSalaryParamsService } from './advance-salary-params.service';

describe('AdvanceSalaryParamsService', () => {
  let service: AdvanceSalaryParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvanceSalaryParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
