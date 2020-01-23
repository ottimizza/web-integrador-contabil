import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hrow',
  templateUrl: './historic-row.component.html',
  styles: [
    `
    .row {
      width: 100%
      /* margin: 0 auto; */
    }
    `
  ]
})
export class HistoricRowComponent {

  @Input() span: string;
  @Input() col = '6';
  @Output() write = new EventEmitter();

  devolve(event: any) {
    this.write.emit(event.target.value);
  }

}
