import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {

  @Input() sizing: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() value: string;
  @Input() fontColor: string;
  @Input() preset: string;

  ngOnInit(): void {
    if (this.preset === 'danger') {
      this._preset('rgb(255, 0, 0)', 'white');
    } else if (this.preset === 'secondary') {
      this._preset('rgb(83, 83, 83)', 'white');
    } else if (this.preset === 'low-purple') {
      this._preset('rgb(84, 0, 255)', 'white');
    }
  }

  get background() {
    const color = this.color ? this.color : 'blue';
    return `background-color: ${color};`;
  }

  get font() {
    const fontColor = this.fontColor ? this.fontColor : 'white';
    return `color: ${fontColor};`;
  }

  private _preset(color: string, fontColor: string) {
    this.color = color;
    this.fontColor = fontColor;
  }

}
