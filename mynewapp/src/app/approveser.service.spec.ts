import { TestBed } from '@angular/core/testing';

import { ApproveserService } from './approveser.service';

describe('ApproveserService', () => {
  let service: ApproveserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
