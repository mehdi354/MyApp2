import { TestBed } from '@angular/core/testing';

import { FootballDetailsService } from './football-details.service';

describe('FootballDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FootballDetailsService = TestBed.get(FootballDetailsService);
    expect(service).toBeTruthy();
  });
});
