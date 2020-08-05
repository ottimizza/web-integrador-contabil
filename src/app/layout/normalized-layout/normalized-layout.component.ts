import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-layout',
  templateUrl: './normalized-layout.component.html',
  styleUrls: ['./normalized-layout.component.scss']
})
export class NormalizedLayoutComponent {

  @Output() scrollHasEnded = new EventEmitter<boolean>();
  @Output() buttonClicked = new EventEmitter<string>();

  @Input() buttons: ActionButton[];
  @Input() breadcrumbAppend: BreadCrumb;

  scrollHasEndedMethod(event: boolean) {
    this.scrollHasEnded.emit(event);
  }

  buttonClickedMethod(event: string) {
    this.buttonClicked.emit(event);
  }

}
