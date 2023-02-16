import { TestBed } from '@angular/core/testing';

import { ResignationpayrollService } from './resignationpayroll.service';

describe('ResignationpayrollService', () => {
  let service: ResignationpayrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResignationpayrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
