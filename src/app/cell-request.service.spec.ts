import { TestBed, inject } from '@angular/core/testing';

import { CellRequestService } from './cell-request.service';

describe('CellRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CellRequestService]
    });
  });

  it('should be created', inject([CellRequestService], (service: CellRequestService) => {
    expect(service).toBeTruthy();
  }));
});
