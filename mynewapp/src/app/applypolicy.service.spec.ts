import { TestBed } from '@angular/core/testing';

import { ApplypolicyService } from './applypolicy.service';

describe('ApplypolicyService', () => {
  let service: ApplypolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplypolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
