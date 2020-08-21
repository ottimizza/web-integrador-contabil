import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input() bold: string | boolean;
  @Input() italic: string | boolean;
  @Input() deep = '';

  public get isBold() {
    return this.is(this.bold);
  }

  public get isItalic() {
    return this.is(this.italic);
  }

  private is(option: string | boolean) {
    return option === '' || option === true;
  }

}
