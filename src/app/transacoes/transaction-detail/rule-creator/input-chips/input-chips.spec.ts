import { InputChipsComponent } from './input-chips.component'
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

describe('Component: InputChips', () => {

  let component: InputChipsComponent;
  let fixture: ComponentFixture<InputChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputChipsComponent],
      providers: [DOCUMENT]
    });

    fixture = TestBed.createComponent(InputChipsComponent);
    component = fixture.componentInstance;
  });

});
