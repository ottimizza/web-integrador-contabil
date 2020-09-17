import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [InputComponent]
})
export class InputModule {}
