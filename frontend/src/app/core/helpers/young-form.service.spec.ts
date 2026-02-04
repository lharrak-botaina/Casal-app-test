import { TestBed } from '@angular/core/testing';

import { YoungFormService } from './young-form.service';

describe('YoungFormService', () => {
  let service: YoungFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoungFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
