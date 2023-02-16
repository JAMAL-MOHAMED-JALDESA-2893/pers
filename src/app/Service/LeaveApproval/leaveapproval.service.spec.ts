import { TestBed } from '@angular/core/testing';

import { LeaveapprovalService } from './leaveapproval.service';

describe('LeaveapprovalService', () => {
  let service: LeaveapprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveapprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
