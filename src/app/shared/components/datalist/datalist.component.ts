import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { PropertyValidator } from '@shared/decorators/validate.decorator';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent {

  @Input() source: any[] = [];
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() deep = '';

  @Input() parse: (src: any) => string;

  @PropertyValidator() @Input() id: string;

  @Output() selectionChange = new EventEmitter<MatOptionSelectionChange>();

  public emit(e: MatOptionSelectionChange) {
    this.selectionChange.emit(e);
  }

}
