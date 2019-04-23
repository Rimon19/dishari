import { TestBed, inject } from '@angular/core/testing';

import { MarchandAuthGuardService } from './marchand-auth-guard.service';

describe('MarchandAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarchandAuthGuardService]
    });
  });

  it('should be created', inject([MarchandAuthGuardService], (service: MarchandAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
