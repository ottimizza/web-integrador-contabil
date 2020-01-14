import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() main: boolean;

  padding() {
    if (this.main) {
      return '10px';
    } else {
      return '0';
    }
  }


}
