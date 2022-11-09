import { TestBed } from '@angular/core/testing';

import { ApplyleaveService } from './applyleave.service';

describe('ApplyholidayService', () => {
  let service: ApplyleaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyleaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
