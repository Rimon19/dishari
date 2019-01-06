import { TestBed, inject } from '@angular/core/testing';

import { UserAddressService } from './user-address.service';

describe('UserAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAddressService]
    });
  });

  it('should be created', inject([UserAddressService], (service: UserAddressService) => {
    expect(service).toBeTruthy();
  }));
});
