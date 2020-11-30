import { TestBed } from '@angular/core/testing';

import { ExtJsService } from './ext-js.service';

describe('ExtJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtJsService = TestBed.get(ExtJsService);
    expect(service).toBeTruthy();
  });
});
