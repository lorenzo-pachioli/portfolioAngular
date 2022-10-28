import { TestBed } from '@angular/core/testing';

import { ElementByIdService } from './element-by-id.service';

describe('ElementByIdService', () => {
  let service: ElementByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
