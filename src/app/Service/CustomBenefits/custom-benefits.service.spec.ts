import { TestBed } from '@angular/core/testing';

import { CustomBenefitsService } from './custom-benefits.service';

describe('CustomBenefitsService', () => {
  let service: CustomBenefitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBenefitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
