import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ott-button',
  templateUrl: './button.component.html',
})

export class ButtonComponent {

  @Input() disabled = false;
  @Input() classes = '';
  @Input() color = 'var(--primary-color)';
  @Input() text = 'white';
  @Input() deep = '';

  @Output() pressed = new EventEmitter<Event>();

  press(e: any) {
    this.pressed.emit(e);
  }

}
