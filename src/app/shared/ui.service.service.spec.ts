import { TestBed } from '@angular/core/testing';

import { Ui.ServiceService } from './ui.service.service';

describe('Ui.ServiceService', () => {
  let service: Ui.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ui.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
