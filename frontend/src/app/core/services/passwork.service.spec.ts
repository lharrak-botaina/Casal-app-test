import { TestBed } from '@angular/core/testing';

import { PassworkService } from './passwork.service';

describe('PassworkService', () => {
  let service: PassworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
