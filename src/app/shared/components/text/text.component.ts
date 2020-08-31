import { Component, Input } from '@angular/core';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input() bold = false;
  @Input() italic = false;

  @Input() color: 'primary' | 'danger' | 'success' | 'info' | 'light' | 'secondary' | 'warning' | 'default' = 'default';
  @Input() deep = '';


  get class() {
    let clazz = '';
    if (this.bold) {
      clazz += 'text-bold';
    }
    if (this.italic) {
      clazz += ' text-italic';
    }
    clazz += ' ' + this.getColor();
    return clazz;
  }

  public getColor() {
    return this.color === 'default' ? '' : `text-${this.color}`;
  }

}
