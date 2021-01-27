import { TestBed } from '@angular/core/testing';

import { HttpAuthGaurdService } from './http-auth-gaurd.service';

describe('HttpAuthGaurdService', () => {
  let service: HttpAuthGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAuthGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
