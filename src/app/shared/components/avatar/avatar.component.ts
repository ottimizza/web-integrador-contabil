import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent {

  @Input() description: string;

  @Input() src: string;

  @Input() width = '46';

  @Input() height = '46';

  circle = true;

  constructor() {
  }

}
