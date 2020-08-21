import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertyValidator } from '@shared/decorators/validate.decorator';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() value = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() control = new FormControl();
  @Input() deep = '';

  @Input() id: string;

  @Output() input = new EventEmitter<any>();

  public emit(e: InputEvent) {
    this.input.emit(e);
  }

}
