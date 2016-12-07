/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestDataService } from './test-data.service';

describe('Service: TestData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestDataService]
    });
  });

  it('should ...', inject([TestDataService], (service: TestDataService) => {
    expect(service).toBeTruthy();
  }));
});
