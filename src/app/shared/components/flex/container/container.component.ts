import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent {

  @Input() class = '';

}
