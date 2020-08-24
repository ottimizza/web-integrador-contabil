import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCol]'
})
export class ColumnDirective {

  @Input('size.xs') extraSmall: string;
  @Input('size.sm') small: string;
  @Input('size.md') medium: string;
  @Input('size.lg') large: string;
  @Input('size.xl') extraLarge: string;
  @Input() size: string;

  constructor(el: ElementRef) {
    if (this.extraSmall || this.small || this.medium || this.large || this.extraLarge) {
      if (this.extraSmall) {
        el.nativeElement.classList.add(`col-xs-${this.extraSmall}`);
      }
      if (this.small) {
        el.nativeElement.classList.add(`col-sm-${this.small}`);
      }
      if (this.medium) {
        el.nativeElement.classList.add(`col-md-${this.medium}`);
      }
      if (this.large) {
        el.nativeElement.classList.add(`col-lg-${this.large}`);
      }
      if (this.extraLarge) {
        el.nativeElement.classList.add(`col-xl-${this.extraLarge}`);
      }
    } else {
      el.nativeElement.classList.add('col');
    }
  }

}
