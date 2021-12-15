import { TestBed } from '@angular/core/testing';

import { ClientesAllService } from './clientes-all.service';

describe('ClientesAllService', () => {
  let service: ClientesAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
