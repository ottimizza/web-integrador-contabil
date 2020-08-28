import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})

export class ButtonComponent {

  @Input() classes = '';

  @Output() pressed = new EventEmitter<Event>();

  press(e: any) {
    this.pressed.emit(e);
  }

}
