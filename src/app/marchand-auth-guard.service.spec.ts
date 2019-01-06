import { TestBed, inject } from '@angular/core/testing';

import { MarchandAuthGuard } from './marchand-auth-guard.service';

describe('MarchandAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarchandAuthGuard]
    });
  });

  it('should be created', inject([MarchandAuthGuard], (service: MarchandAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
