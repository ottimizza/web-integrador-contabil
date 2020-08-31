import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { Empresa } from '@shared/models/Empresa';
import { GuidedTour } from '@gobsio/ngx-guided-tour';

@Component({
  selector: 'layout',
  templateUrl: './normalized-layout.component.html',
  styleUrls: ['./normalized-layout.component.scss']
})
export class NormalizedLayoutComponent {

  @Output() scrollHasEnded = new EventEmitter<boolean>();
  @Output() buttonClicked = new EventEmitter<string>();
  @Output() companySelected = new EventEmitter<string>();

  @Input() buttons: ActionButton[];
  @Input() breadcrumbAppend: BreadCrumb;

  /**
   * User guided tour, if specified a button is shown at end of the breadcrumb
   * where the user can get a tutorial of how the current page works.
   */
  @Input()
  public tutorial: GuidedTour;

  scrollHasEndedMethod(event: boolean) {
    this.scrollHasEnded.emit(event);
  }

  companySelectedMethod(event: string) {
    this.companySelected.emit(event);
  }

  buttonClickedMethod(event: string) {
    this.buttonClicked.emit(event);
  }

}
