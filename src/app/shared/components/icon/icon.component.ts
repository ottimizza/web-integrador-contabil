import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html'
})
export class IconComponent {

  @Input() type: 'default' | 'solid' | 'regular' | 'light' | 'duotone' = 'duotone';
  @Input() color: 'primary' | 'danger' | 'success' | 'info' | 'light' | 'secondary' | 'warning' | 'default' = 'default';
  @Input() name = 'icons-alt';


  icon() {
    return `fa-fw ${this.init} fa-${this.name} ${this.textColor}`;
  }

  private get textColor() {
    if (this.color === 'default') {
      return '';
    }
    return `text-${this.color}`;
  }

  private get init() {
    switch (this.type) {
      case 'solid':
        return 'fas';
      case 'regular':
        return 'far';
      case 'light':
        return 'fal';
      case 'duotone':
        return 'fad';
      default:
        return 'fa';
    }
  }

}
