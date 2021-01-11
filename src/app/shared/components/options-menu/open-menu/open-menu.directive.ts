import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { OptionsMenuService } from '../options-menu.service';

@Directive({
  selector: '[appOpenMenu]'
})
export class OpenMenuDirective {

  @Input()
  public active = true;

  @Output()
  public opened = new EventEmitter<MouseEvent>();

  constructor(private service: OptionsMenuService) { }

  @HostListener('contextmenu', ['$event'])
  public onContextMenu(e: MouseEvent) {
    if (this.active) {
      e.preventDefault();
      this.service.onContextMenu(e);
    }
    this.opened.emit(e);
  }

}
