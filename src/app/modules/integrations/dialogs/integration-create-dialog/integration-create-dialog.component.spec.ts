import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationCreateDialogComponent } from './integration-create-dialog.component';

describe('IntegrationCreateDialogComponent', () => {
  let component: IntegrationCreateDialogComponent;
  let fixture: ComponentFixture<IntegrationCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
