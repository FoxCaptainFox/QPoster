import { TestBed } from '@angular/core/testing';

import { AboutServiceService } from './about-service.service';

describe('AboutServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AboutServiceService = TestBed.get(AboutServiceService);
    expect(service).toBeTruthy();
  });
});
