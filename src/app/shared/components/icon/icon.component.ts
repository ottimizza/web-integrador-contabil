import { Component, Input } from '@angular/core';

export type IconSize = 'xs'
    | 'sm'
    | 'lg'
    | '2x'
    | '3x'
    | '5x'
    | '7x'
    | '10x'
    | 'md';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html'
})
export class IconComponent {

  @Input() type: 'default' | 'solid' | 'regular' | 'light' | 'duotone' = 'duotone';
  @Input() color: 'primary' | 'danger' | 'success' | 'info' | 'light' | 'secondary' | 'warning' | 'default' = 'default';
  @Input() name = 'icons-alt';
  @Input() size: IconSize = 'md';


  icon() {
    let icon = `fa-fw ${this.init} fa-${this.name} ${this.textColor}`;
    if (this.size && this.size !== 'md') {
      icon += ` fa-${this.size}`;
    }
    return icon;
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
