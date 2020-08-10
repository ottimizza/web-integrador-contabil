import { Component, Input, Output, EventEmitter } from '@angular/core';

export class HexColor {
  constructor(readonly color: string) { }
}

export class ActionButton {
  id: string;
  icon: string;
  label: string;
  verification?: boolean;
  color?:
    | 'btn-primary'
    | 'btn-secondary'
    | 'btn-success'
    | 'btn-danger'
    | 'btn-warning'
    | 'btn-info'
    | 'btn-light'
    | 'btn-link'
    | 'btn-dark'
    | 'btn-link'
    | HexColor;
}

@Component({
  selector: 'app-actions',
  templateUrl: './action-buttons.component.html'
})
export class ActionButtonsComponent {
  @Input() buttons: ActionButton[];
  @Output() clicked: EventEmitter<string> = new EventEmitter();

  select(id: string) {
    this.clicked.emit(id);
  }

  color(btn: ActionButton) {
    const color = btn.color as HexColor;
    return `background-color: ${color.color}; border-color: ${color.color};`;
  }

  getColor(color: any) {
    return color ?? '';
  }

  typeof(a: any) {
    return typeof a;
  }

  // getColor(index: number) {
  //   if (!this.buttons[index].color) {
  //     return 'btn-primary';
  //   } else if (typeof this.buttons[index].color === 'string') {
  //     return this.buttons[index].color;
  //   } else {

  //   }
  // }
}
