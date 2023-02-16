import { TestBed } from '@angular/core/testing';

import { SalaryGenerationService } from './salary-generation.service';

describe('SalaryGenerationService', () => {
  let service: SalaryGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
