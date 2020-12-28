import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { BeforeComponentDestroyed } from '@shared/operators/before-component-destroyed.operator';
import { TimeUtils } from '@shared/utils/time.utils';
import { OptionsMenuService } from './options-menu.service';

export class OptionMenuItem {
  icon?: string;
  text: string;
  click: (e: MouseEvent) => void;
}

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent extends BeforeComponentDestroyed implements OnInit {

  @Input()
  public items: OptionMenuItem[] = [];

  @ViewChild('trigger')
  private trigger: MatMenuTrigger;

  @ViewChild('triggerButton', { static: true })
  private triggerButton: ElementRef<HTMLButtonElement>

  constructor(private service: OptionsMenuService) {
    super();
  }

  ngOnInit(): void {
    this.service.menuOpened$
    .pipe(this.takeUntil)
    .subscribe(result => this.show(result as any))
  }

  private async show(position: { left: string, top: string }) {
    this.triggerButton.nativeElement.style.display = 'block';
    this.triggerButton.nativeElement.style.left = position.left;
    this.triggerButton.nativeElement.style.top = position.top;

    await TimeUtils.sleep(0)
    this.trigger.openMenu();
    await TimeUtils.sleep(0)

    this.triggerButton.nativeElement.style.display = 'none';
  }

}
