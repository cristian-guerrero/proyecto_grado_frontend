import { TestBed } from '@angular/core/testing';

import { LoadingAndNotifierService } from './loading-and-notifier.service';

describe('LoadingAndNotifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingAndNotifierService = TestBed.get(LoadingAndNotifierService);
    expect(service).toBeTruthy();
  });
});
