import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallAccountantDialogComponent } from './call-accountant-dialog.component';

describe('CallAccountantDialogComponent', () => {
  let component: CallAccountantDialogComponent;
  let fixture: ComponentFixture<CallAccountantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallAccountantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallAccountantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
