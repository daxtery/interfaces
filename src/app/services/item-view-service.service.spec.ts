/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemViewServiceService } from './item-view-service.service';

describe('Service: ItemViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemViewServiceService]
    });
  });

  it('should ...', inject([ItemViewServiceService], (service: ItemViewServiceService) => {
    expect(service).toBeTruthy();
  }));
});
