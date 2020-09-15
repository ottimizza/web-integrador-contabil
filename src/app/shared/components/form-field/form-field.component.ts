import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements OnInit {

  @Input()
  public label: string;

  @Input()
  public childId: string;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    const input = this.doc.getElementById(this.childId);
    input.classList.add('form-control');
  }

}
