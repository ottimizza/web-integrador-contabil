import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hrow',
  templateUrl: './historic-row.component.html'
})
export class HistoricRowComponent {

  @Input() span: string;
  @Input() col = '6';

}
