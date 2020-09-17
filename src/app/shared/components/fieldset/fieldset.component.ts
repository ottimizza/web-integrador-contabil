import { Component, Input } from '@angular/core';

@Component({
  selector: 'ott-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldSetComponent {

  @Input() legend = '';
  @Input() deep = '';

}
