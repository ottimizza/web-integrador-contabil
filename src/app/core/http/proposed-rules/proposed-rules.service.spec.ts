import { TestBed } from '@angular/core/testing';

import { ProposedRulesService } from './proposed-rules.service';

describe('ProposedRulesService', () => {
  let service: ProposedRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposedRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
