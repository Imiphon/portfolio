import { TestBed } from '@angular/core/testing';

import { IosCheckerService } from './ios-checker.service';

describe('IosCheckerService', () => {
  let service: IosCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
