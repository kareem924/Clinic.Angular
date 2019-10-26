/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IdentityServerService } from './identity-server.service';

describe('Service: IdentityServer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdentityServerService]
    });
  });

  it('should ...', inject([IdentityServerService], (service: IdentityServerService) => {
    expect(service).toBeTruthy();
  }));
});
