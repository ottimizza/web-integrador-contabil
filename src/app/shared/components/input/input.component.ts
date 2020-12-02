import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ott-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges {

  @Input() value = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() control = new FormControl();
  @Input() deep = '';
  @Input() disabled = false;
  @Input() type: 'text' | 'search' | 'textarea' = 'text';

  @Input() id: string;

  @Output() input = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        if (key === 'disabled') {
          this.disabled ? this.control.disable() : this.control.enable();
        }
        if (key === 'value') {
          this.control.setValue(this.value);
        }
      }
    }
  }

  public emitInput(e: any) {
    this.input.emit(e);
  }

  public emitSubmit(e: any) {
    this.submit.emit(e);
  }

}
