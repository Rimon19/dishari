import { TestBed, inject } from '@angular/core/testing';

import { PdfViewerService } from './pdf-viewer.service';

describe('PdfViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfViewerService]
    });
  });

  it('should be created', inject([PdfViewerService], (service: PdfViewerService) => {
    expect(service).toBeTruthy();
  }));
});
