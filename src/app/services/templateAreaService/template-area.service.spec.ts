import { TestBed } from '@angular/core/testing';

import { TemplateAreaService } from './template-area.service';

describe('TemplateAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateAreaService = TestBed.get(TemplateAreaService);
    expect(service).toBeTruthy();
  });
});
