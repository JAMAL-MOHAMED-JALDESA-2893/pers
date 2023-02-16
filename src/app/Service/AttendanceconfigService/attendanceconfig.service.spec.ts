import { TestBed } from '@angular/core/testing';

import { AttendanceconfigService } from './attendanceconfig.service';

describe('AttendanceconfigService', () => {
  let service: AttendanceconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
