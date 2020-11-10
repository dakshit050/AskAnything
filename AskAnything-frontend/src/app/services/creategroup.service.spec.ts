import { TestBed } from '@angular/core/testing';

import { CreategroupService } from './creategroup.service';

describe('CreategroupService', () => {
  let service: CreategroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreategroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
