import { TestBed, inject } from '@angular/core/testing';

import { CharsetService } from './charset.service';

describe('CharsetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharsetService]
    });
  });

  it('should be created', inject([CharsetService], (service: CharsetService) => {
    expect(service).toBeTruthy();
  }));
});
