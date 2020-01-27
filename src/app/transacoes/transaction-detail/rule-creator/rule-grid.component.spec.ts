import { RuleGridComponent } from './rule-grid.component'
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('Componente: RuleGrid', () => {

  let component: RuleGridComponent;
  let fixture: ComponentFixture<RuleGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleGridComponent],
      providers: [
        MatDialogRef,
        MAT_DIALOG_DATA
      ]
    });

    fixture = TestBed.createComponent(RuleGridComponent);
    component = fixture.nativeElement;
  });

  it('Método dateFormat() deve transformar data aaaa-mm-dd em dd/mm/aaaa', () => {
    expect(component.dateFormat('2020-01-27')).toBe('27/01/2020');
  });

});
