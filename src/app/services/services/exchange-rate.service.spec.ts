import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangeRateService],
    });
    service = TestBed.inject(ExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
