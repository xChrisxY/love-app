import { TestBed } from '@angular/core/testing';

import { Memories } from './memories';

describe('Memories', () => {
  let service: Memories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Memories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
