import { TestBed } from '@angular/core/testing';

import { CopyImageToServerService } from './copy-image-to-server.service';

describe('CopyImageToServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopyImageToServerService = TestBed.get(CopyImageToServerService);
    expect(service).toBeTruthy();
  });
});
