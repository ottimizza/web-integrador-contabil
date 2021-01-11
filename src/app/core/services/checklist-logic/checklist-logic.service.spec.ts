import { TestBed } from '@angular/core/testing';

import { ChecklistLogicService } from './checklist-logic.service';

describe('ChecklistLogicService', () => {
  let service: ChecklistLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
