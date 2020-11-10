import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TimeUtils } from '@shared/utils/time.utils';

@Component({
  selector: 'app-slide-check',
  templateUrl: './slide-check.component.html',
  styleUrls: ['./slide-check.component.scss']
})
export class SlideCheckComponent implements OnInit {

  @Input()
  public leftLabel = 'Rejeitar';

  @Input()
  public rightLabel = 'Aceitar';

  @Input()
  public transitionDelay = 700;

  @Output()
  public toggle = new EventEmitter<boolean>();

  @Output()
  public animationEnd = new EventEmitter<boolean>();

  public orientationText: string;
  public backgroundColor = 'white';

  constructor() { }

  public drop(event: CdkDragDrop<any>) {
    if (event.previousIndex === 1 && event.previousIndex !== event.currentIndex && this.backgroundColor === 'white') {
      const accepted = event.currentIndex === 2;
      this.toggle.emit(accepted);
      this.paint(accepted);
    }
  }

  public async paint(accepted: boolean) {
    this.backgroundColor = accepted ? 'var(--success)' : 'var(--danger)';
    await TimeUtils.sleep(this.transitionDelay);
    this.backgroundColor = 'white';
    await TimeUtils.sleep(300);
    this.animationEnd.emit(accepted);
  }

  @HostListener('keyup.arrowright')
  public onKeyConfirm() {
    const event: any = { previousIndex: 1, currentIndex: 2 };
    this.drop(event);
  }

  @HostListener('keyup.arrowleft')
  public onKeyCancel() {
    const event: any = { previousIndex: 1, currentIndex: 0 };
    this.drop(event);
  }

  public get isMobile() {
    return window.screen.width <= 768;
  }

  ngOnInit(): void {
    this.orientationText = `Arraste para a direita para ${this.rightLabel.toLowerCase()} ou para a esquerda para ${this.leftLabel.toLocaleLowerCase()}.`;
  }

}
