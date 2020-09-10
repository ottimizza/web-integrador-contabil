import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ott-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() value = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() control = new FormControl();
  @Input() deep = '';
  @Input() disabled = false;

  @Input() id: string;

  @Output() input = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();

  public emitInput(e: any) {
    this.input.emit(e);
  }

  public emitSubmit(e: any) {
    this.submit.emit(e);
  }

}
