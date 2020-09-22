import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange, MatSelect } from '@angular/material/select';

@Component({
  selector: 'ott-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent {

  @Input() source: any[] = [];
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() deep = '';

  @Input() parse: (src: any) => string;

  @Input() multiple = false;

  @Input() id: string;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  public emit(e: MatSelectChange) {
    this.selectionChange.emit(e);
  }

}
