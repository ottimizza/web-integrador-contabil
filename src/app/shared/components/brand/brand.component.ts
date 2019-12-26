import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html'
})
export class BrandComponent {

  @Input() description: string;

  @Input() src: string;

  @Input() classes: string;

  constructor() {
  }

}
