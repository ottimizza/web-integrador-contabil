import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { CALENDAR_COMPONENT_FORMATS } from './support/formats/calendar-component-formats';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CALENDAR_COMPONENT_FORMATS }
  ]
})
export class CalendarComponent implements OnInit {
  public value: Date;

  @Input() public label: string;
  @Input() public placeholder = '';
  @Input() public initialValue: any;
  @Input() public control = new FormControl();

  @Output() public dateChanged: EventEmitter<Date> = new EventEmitter();

  @ViewChild('calendar', { static: false })
  public el: ElementRef<HTMLDivElement>;

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  public toggleClass(event: string) {
    if (`${event}` === 'true') {
      this.el.nativeElement.classList.add('focused');
    } else {
      this.el.nativeElement.classList.remove('focused');
    }
  }

  ngOnInit() {
    this.value = this.initialValue ? new Date(this.initialValue) : new Date();
  }

  emit() {
    this.dateChanged.emit(this.value);
  }

  getScreenSize(): boolean {
    return screen.width < 768;
  }

}
