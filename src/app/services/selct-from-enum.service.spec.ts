import { TestBed } from '@angular/core/testing';

import { SelctFromEnumService } from './selct-from-enum.service';

describe('SelctFromEnumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelctFromEnumService = TestBed.get(SelctFromEnumService);
    expect(service).toBeTruthy();
  });
});
