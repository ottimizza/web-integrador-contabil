import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hrow',
  templateUrl: './historic-row.component.html',
  styleUrls: ['./historic-row.component.scss']
})
export class HistoricRowComponent {

  @Input() span: string;
  @Input() col = '6';
  @Output() write = new EventEmitter();

  devolve(event: any) {
    this.write.emit(event.target.value);
  }

}
