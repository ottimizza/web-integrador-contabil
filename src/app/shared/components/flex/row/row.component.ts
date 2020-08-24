import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html'
})
export class RowComponent {

  @Input() class = '';

}
