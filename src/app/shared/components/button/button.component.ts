import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
    | 'btn-link';
}

@Component({
  selector: 'app-actions',
  templateUrl: './button.component.html'
})
export class ActionButtonsComponent {
  @Input() buttons: ActionButton[];
  @Output() clicked: EventEmitter<string> = new EventEmitter();

  select(id: string) {
    this.clicked.emit(id);
  }
}
