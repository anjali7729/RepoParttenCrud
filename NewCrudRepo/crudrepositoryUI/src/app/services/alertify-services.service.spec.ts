/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertifyServicesService } from './alertify-services.service';

describe('Service: AlertifyServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertifyServicesService]
    });
  });

  it('should ...', inject([AlertifyServicesService], (service: AlertifyServicesService) => {
    expect(service).toBeTruthy();
  }));
});
