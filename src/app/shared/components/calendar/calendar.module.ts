import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [CalendarComponent]
})
export class CalendarModule {}
