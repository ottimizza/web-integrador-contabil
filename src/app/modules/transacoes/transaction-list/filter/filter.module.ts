import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
