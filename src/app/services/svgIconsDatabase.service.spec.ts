/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SvgCategoryIconsDatabaseService } from './svgIconsDatabase.service';

describe('Service: SvgIconsDatabase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgCategoryIconsDatabaseService]
    });
  });

  it('should ...', inject([SvgCategoryIconsDatabaseService], (service: SvgCategoryIconsDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
