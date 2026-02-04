import { TestBed } from '@angular/core/testing';

import { IsPasswordMatchService } from './is-password-match.service';

describe('IsPasswordMatchService', () => {
  let service: IsPasswordMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsPasswordMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
