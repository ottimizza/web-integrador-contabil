import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormFieldModule } from '../form-field/form-field.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldModule,

    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [CalendarComponent]
})
export class CalendarModule {}
