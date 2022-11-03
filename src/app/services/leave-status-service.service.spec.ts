import { TestBed } from '@angular/core/testing';

import { LeaveStatusServiceService } from './leave-status-service.service';

describe('LeaveStatusServiceService', () => {
  let service: LeaveStatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveStatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
