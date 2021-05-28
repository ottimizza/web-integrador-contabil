import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStandardIntegrationDialogComponent } from './select-standard-integration-dialog.component';

describe('SelectStandardIntegrationDialogComponent', () => {
  let component: SelectStandardIntegrationDialogComponent;
  let fixture: ComponentFixture<SelectStandardIntegrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStandardIntegrationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStandardIntegrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
