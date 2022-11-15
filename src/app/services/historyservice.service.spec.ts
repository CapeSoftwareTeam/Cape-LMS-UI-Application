import { TestBed } from '@angular/core/testing';

import { HistoryService } from './historyservice.service';

describe('HistoryserviceService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
