import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rule-filter',
  templateUrl: './rule-filter.component.html',
  styles: [`
    .form-control {
      border-radius: 12px;
    }
  `]
})
export class RuleFilterComponent {

  @Output() search: EventEmitter<string> = new EventEmitter();
  text: string;

  get info() {
    return 'Use este campo para filtrar as regras a partir de campo e valor';
  }

  write() {
    this.search.emit(this.text);
  }

}
