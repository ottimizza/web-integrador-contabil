import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange, MatSelect } from '@angular/material';
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
  @Input() showLabel = true;
  @Input() deep = '';

  @Input() parse: (src: any) => string;

  @PropertyValidator() @Input() id: string;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  public emit(e: MatSelectChange) {
    console.log(e);
    this.selectionChange.emit(e);
  }

}
