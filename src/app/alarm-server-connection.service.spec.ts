import { TestBed } from '@angular/core/testing';

import { AlarmServerConnectionService } from './alarm-server-connection.service';

describe('AlarmServerConnectionService', () => {
  let service: AlarmServerConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmServerConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
