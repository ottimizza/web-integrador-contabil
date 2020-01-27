import { RuleGridComponent } from './rule-grid.component'
import { TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('Componente: RuleGrid', () => {

  let component: RuleGridComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleGridComponent],
      providers: [
        MatDialogRef,
        MAT_DIALOG_DATA
      ]
    });
  });

});
